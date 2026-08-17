import { Navigate, Route, Routes, useLocation } from 'react-router-dom';
import { Layout } from './components/layout/Layout';
import Home from './pages/Home';
import Cultos from './pages/Cultos';
import Doacao from './pages/Doacao';
import Contato from './pages/Contato';
import Estudos from './pages/Estudos';
import Ministerios from './pages/Ministerios';

/** Preserva a query string ao redirecionar (ex.: ministries.html?ministerio=louvor). */
function RedirecionaComQuery({ para }: { para: string }) {
  const { search } = useLocation();
  return <Navigate to={`${para}${search}`} replace />;
}

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/cultos" element={<Cultos />} />
        <Route path="/doacao" element={<Doacao />} />
        <Route path="/contato" element={<Contato />} />
        <Route path="/estudos" element={<Estudos />} />
        <Route path="/ministerios" element={<Ministerios />} />

        {/* URLs antigas (.html) — mantidas para não quebrar links já indexados. */}
        <Route path="/index.html" element={<Navigate to="/" replace />} />
        <Route path="/cultos.html" element={<Navigate to="/cultos" replace />} />
        <Route path="/doe.html" element={<Navigate to="/doacao" replace />} />
        <Route path="/doe" element={<Navigate to="/doacao" replace />} />
        <Route path="/contato.html" element={<Navigate to="/contato" replace />} />
        <Route
          path="/ministries.html"
          element={<RedirecionaComQuery para="/ministerios" />}
        />
        <Route path="/ministries" element={<RedirecionaComQuery para="/ministerios" />} />

        {/* EBD e Capacitação viraram abas de /estudos. */}
        <Route path="/estudo.html" element={<Navigate to="/estudos?aba=ebd" replace />} />
        <Route path="/ebd" element={<Navigate to="/estudos?aba=ebd" replace />} />
        <Route
          path="/capacitacao.html"
          element={<Navigate to="/estudos?aba=capacitacao" replace />}
        />
        <Route
          path="/capacitacao"
          element={<Navigate to="/estudos?aba=capacitacao" replace />}
        />

        {/* Área interna removida na migração. */}
        <Route path="/admin.html" element={<Navigate to="/" replace />} />
        <Route path="/admin" element={<Navigate to="/" replace />} />
        <Route path="/loumi.html" element={<Navigate to="/" replace />} />
        <Route path="/loumi" element={<Navigate to="/" replace />} />

        {/* Páginas descartadas na migração. */}
        <Route path="/about.html" element={<Navigate to="/" replace />} />
        <Route path="/oracao.html" element={<Navigate to="/" replace />} />

        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  );
}
