import React, { useState } from 'react';
import Modal from 'react-modal';
import './App.css';

import { ImBin2 } from "react-icons/im";
import { RiPencilFill } from "react-icons/ri";
import { FaPlus } from "react-icons/fa";

Modal.setAppElement('#root');

function App() {
  const [items, setItems] = useState([]);
  const [selectedItemId, setSelectedItemId] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isInputVisible, setIsInputVisible] = useState(false);
  const [selectedItems, setSelectedItems] = useState([]);

 
  const [description, setDescription] = useState('');

  function addItem(e) {
    e.preventDefault();
    const itemText = e.target.itemInput.value.trim();

    if (itemText !== '') {
      setItems([...items, { id: items.length + 1, text: itemText, description }]);
      e.target.itemInput.value = '';
      setDescription('');
      setIsInputVisible(false);
    }
  }

  function deleteItem(id) {
    setSelectedItemId(id);
    setIsDeleteModalOpen(true);
  }

  function confirmDelete() {
    setItems(items.filter(item => item.id !== selectedItemId));
    setSelectedItems(selectedItems.filter(selectedId => selectedId !== selectedItemId));
    setIsDeleteModalOpen(false);
  }

  function toggleSelectItem(id) {
    setSelectedItems(prevSelectedItems => {
      if (prevSelectedItems.includes(id)) {
        return prevSelectedItems.filter(selectedId => selectedId !== id);
      } else {
        return [...prevSelectedItems, id];
      }
    });
  }

  function openModal(id) {
    setSelectedItemId(id);
    setIsModalOpen(true);
  }

  function closeModal() {
    setSelectedItemId(null);
    setIsModalOpen(false);
  }

  function closeDeleteModal() {
    setSelectedItemId(null);
    setIsDeleteModalOpen(false);
  }

  return (
    <div className="App">
      <div className='topo'>
     
                <button className='organizacao'>Organização</button>
                <button className='tarefas'>Tarefas</button>
           
      
      </div>
      
      <div className='container'>
        <span className="titulo">Otimize seu tempo e se organize com o nosso Planejador Diário.</span>
        <div className="flex-container">
          <div className="grid-item">Tarefa</div>
          <div className="grid-item">Status</div>
          <div className="grid-item">Opções</div>
        </div>
        <ul>
          <div className='tabela'>
            {items.map(item => (
              <li key={item.id}>
                <span onClick={() => openModal(item.id)} style={{ cursor: 'pointer' }}>
                  {item.text}
                </span>
                <div>
                  <input
                    className='status'
                    type="checkbox"
                    checked={selectedItems.includes(item.id)}
                    onChange={() => toggleSelectItem(item.id)}
                  />
                  <button className='botao' onClick={() => openModal(item.id)}><RiPencilFill /></button>
                  <button className='botao' onClick={() => deleteItem(item.id)}><ImBin2 /></button>
                </div>
              </li>
            ))}
          </div>
        </ul>
        <span className='adicionar2'>Novo Tarefa</span>
        <button className='adicionar' onClick={() => setIsInputVisible(true)}><FaPlus /></button>
        {isInputVisible && (
          <form onSubmit={addItem}>
            <input type="text" name="itemInput" placeholder="Digite um item..." />
            <input type="text" name="descriptionInput" placeholder="Digite uma descrição..." value={description} onChange={(e) => setDescription(e.target.value)} />
            <button type="submit">Adicionar</button>
          </form>
        )}

        
        <Modal
          isOpen={isModalOpen}
          onRequestClose={closeModal}
          contentLabel="Detalhes do Item"
          className="react-modal"
          overlayClassName="react-modal-overlay"
        >
          {selectedItemId && (
            <div>
              <button className="react-modal-close-button" onClick={closeModal}>&times;</button>
              <h2 className='detalhes'>Deseja editar esse item?</h2>
              <p>ID: {selectedItemId}</p>
              <p className='botoes'>{items.find(item => item.id === selectedItemId)?.description}</p>
              <div className='botoes'>
                <button className='nao' onClick={closeModal}>Não</button>
                <button className='sim'>Sim</button>
              </div>
            </div>
          )}
        </Modal>

       
        <Modal
          isOpen={isDeleteModalOpen}
          onRequestClose={closeDeleteModal}
          contentLabel="Confirmar Exclusão"
          className="react-modal"
          overlayClassName="react-modal-overlay"
        >
          {selectedItemId && (
            <div>
              <button className="react-modal-close-button" onClick={closeDeleteModal}>&times;</button>
              <h2 className='detalhes'>Deseja excluir este item?</h2>
              <p>ID: {selectedItemId}</p>
              <p className='botoes'>{items.find(item => item.id === selectedItemId)?.description}</p>
              <div className='botoes'>
                <button className='nao' onClick={closeDeleteModal}>Não</button>
                <button className='sim' onClick={confirmDelete}>Sim</button>
              </div>
            </div>
          )}
        </Modal>
      </div>
    </div>
  );
}

export default App;
