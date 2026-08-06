import { pipeline, env } from '@huggingface/transformers';

// Skip local model checks, use the cache
env.allowLocalModels = false;
env.useBrowserCache = true;

class WhisperPipeline {
  static task = 'automatic-speech-recognition';
  static model = 'Xenova/whisper-tiny.en';
  static instance = null;

  static async getInstance(progress_callback = null) {
    if (this.instance === null) {
      this.instance = await pipeline(this.task, this.model, {
        progress_callback,
      });
    }
    return this.instance;
  }
}

class SummarizationPipeline {
  static task = 'summarization';
  // distilbart-cnn-6-6 is about 230MB, great for summarization
  static model = 'Xenova/distilbart-cnn-6-6'; 
  static instance = null;

  static async getInstance(progress_callback = null) {
    if (this.instance === null) {
      this.instance = await pipeline(this.task, this.model, {
        progress_callback,
      });
    }
    return this.instance;
  }
}

self.addEventListener('message', async (event) => {
  const { type, audioData, text, template } = event.data;

  if (type === 'transcribe') {
    try {
      self.postMessage({ type: 'transcribe', status: 'loading' });
      
      const transcriber = await WhisperPipeline.getInstance((x) => {
        x.type = 'transcribe';
        self.postMessage(x);
      });

      self.postMessage({ type: 'transcribe', status: 'processing' });

      const output = await transcriber(audioData, {
        language: 'english',
        task: 'transcribe',
        chunk_length_s: 30,
        stride_length_s: 5,
      });

      self.postMessage({
        type: 'transcribe',
        status: 'complete',
        text: output.text,
      });

    } catch (error) {
      self.postMessage({
        type: 'transcribe',
        status: 'error',
        error: error.message || 'Failed to transcribe audio.',
      });
    }
  } else if (type === 'summarize') {
    try {
      self.postMessage({ type: 'summarize', status: 'loading' });
      
      const summarizer = await SummarizationPipeline.getInstance((x) => {
        x.type = 'summarize';
        self.postMessage(x);
      });

      self.postMessage({ type: 'summarize', status: 'processing' });

      // Clean and prepare the input text
      // Transformers models have a token limit (e.g., 1024 tokens).
      // For long transcripts, we should truncate it or chunk it.
      // 1 char ~= 0.25 tokens. 1024 tokens ~= 4000 chars.
      const safeText = text.substring(0, 4000);
      
      // We can use the template to guide the summarization if we wanted a text-generation model,
      // but since we are using a dedicated summarizer, it will just summarize.
      // We'll generate a few variants based on the length for different templates.
      let maxLength = 150;
      let minLength = 40;
      
      if (template === 'executive') {
        maxLength = 200;
        minLength = 80;
      } else if (template === 'action') {
         maxLength = 100;
         minLength = 30;
      }

      const output = await summarizer(safeText, {
        max_length: maxLength,
        min_length: minLength,
      });

      self.postMessage({
        type: 'summarize',
        status: 'complete',
        text: output[0].summary_text,
      });

    } catch (error) {
      self.postMessage({
        type: 'summarize',
        status: 'error',
        error: error.message || 'Failed to summarize text.',
      });
    }
  }
});
