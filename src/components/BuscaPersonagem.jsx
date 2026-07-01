import { useState } from 'react';
import { personagens } from '../data/personagem';

export function BuscaPersonagem({ valorSelecionado, onSelecionar }) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const personagensFiltrados = personagens.filter(p =>
    p.nome.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="busca-personagem-container" style={{ position: 'relative', width: '100%' }}>
      <input
        type="text"
        className="busca-input"
        value={isOpen ? searchTerm : valorSelecionado}
        placeholder="Digite o nome"
        onChange={(event) => setSearchTerm(event.target.value)}
        onFocus={() => {
          setIsOpen(true);
          setSearchTerm(""); 
        }}
      />
      {isOpen && (
        <div className="busca-dropdown" style={{
          position: 'absolute',
          top: '100%',
          left: 0,
          right: 0,
          backgroundColor: '#351b5f',
          border: '1px solid #221439',
          borderRadius: '4px',
          maxHeight: '200px',
          overflowY: 'auto',
          zIndex: 1000,
          textAlign: 'left'
        }}>
          {personagensFiltrados.map(p => (
            <div
              key={p.nome}
              className="busca-item"
              style={{
                display: 'flex',
                alignItems: 'center',
                padding: '8px 12px',
                cursor: 'pointer',
                borderBottom: '1px solid #3e404a',
                gap: '8px'
              }}
              onClick={() => {
                onSelecionar(p.nome);
                setIsOpen(false);
              }}
            >
              <img
                src={p.imagem !== "ID" 
                  ? `https://lh3.googleusercontent.com/d/${p.imagem}` 
                  : "https://placehold.co/150x150/transparent/ffffff.png?text=?"
                }
                alt={p.nome}
                style={{ width: '28px', height: '28px', borderRadius: '50%', objectFit: 'cover' }}
              />
              <span>{p.nome}</span>
            </div>
          ))}
          {personagensFiltrados.length === 0 && (
            <div style={{ padding: '8px 12px', color: '#9ca3af' }}>
              Nenhum personagem encontrado
            </div>
          )}
        </div>
      )}
    </div>
  );
}