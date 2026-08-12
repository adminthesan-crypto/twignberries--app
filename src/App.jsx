import React from 'react';
import { BrowserRouter, HashRouter, Routes, Route, useParams } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import MainLayout from './layouts/MainLayout';
import WidgetLayout from './layouts/WidgetLayout';
import HomePage from './pages/HomePage';
import ToolPage from './pages/ToolPage';
import NotFoundPage from './pages/NotFoundPage';
import TOOLS from './data/toolsData';

import { BackdropProvider } from './contexts/BackdropContext';

// Helper component to render the active tool in the embed layout
function EmbedToolProxy() {
  const { id } = useParams();
  const tool = TOOLS.find(t => t.id === id);
  if (!tool) return <NotFoundPage />;
  const ActiveComponent = tool.component;
  return <ActiveComponent />;
}

function App() {
  const isExtension = typeof chrome !== 'undefined' && chrome.runtime && chrome.runtime.id;
  const Router = isExtension ? HashRouter : BrowserRouter;

  return (
    <HelmetProvider>
      <BackdropProvider>
        <Router>
          <Routes>
            {/* Main Website Routes */}
          <Route element={<MainLayout />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/tool/:id" element={<ToolPage />} />
            <Route path="/tool/:id/:useCase" element={<ToolPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Route>

          {/* Embeddable Widget Routes */}
          <Route element={<WidgetLayout />}>
            <Route path="/embed/:id" element={<EmbedToolProxy />} />
          </Route>
        </Routes>
        </Router>
      </BackdropProvider>
    </HelmetProvider>
  );
}

export default App;
