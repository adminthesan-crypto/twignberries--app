import { pipeline, env } from '@huggingface/transformers';

// Skip local model checks, use the cache
env.allowLocalModels = false;
env.useBrowserCache = true;

class PipelineSingleton {
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

self.addEventListener('message', async (event) => {
  const { type, audioData } = event.data;

  if (type === 'transcribe') {
    try {
      // 1. Send status that we are loading the model
      self.postMessage({ status: 'loading' });
      
      const transcriber = await PipelineSingleton.getInstance((x) => {
        // Send download progress to the main thread
        self.postMessage(x);
      });

      // 2. Send status that transcription has started
      self.postMessage({ status: 'processing' });

      // 3. Run the model on the raw Float32Array audio data
      const output = await transcriber(audioData, {
        language: 'english',
        task: 'transcribe',
        chunk_length_s: 30, // Good for long audio
        stride_length_s: 5,
      });

      // 4. Send back the final text
      self.postMessage({
        status: 'complete',
        text: output.text,
      });

    } catch (error) {
      self.postMessage({
        status: 'error',
        error: error.message || 'Failed to transcribe audio.',
      });
    }
  }
});
