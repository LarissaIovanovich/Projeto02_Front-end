// Cadastro de dicas de reciclagem
document.getElementById('recycling-form').addEventListener('submit', function(event) {
  event.preventDefault();
  
  const materialInput = document.getElementById('material');
  const dicaInput = document.getElementById('dica');
  
  const material = materialInput.value;
  const dica = dicaInput.value;
  
  if (!material || !dica) {
    alert('Por favor, preencha todos os campos.');
    return;
  }
  
  const dicaObj = {
    material,
    dica
  };
  
  let dicas = JSON.parse(localStorage.getItem('dicas')) || [];
  dicas.push(dicaObj);
  localStorage.setItem('dicas', JSON.stringify(dicas));
  
  materialInput.value = '';
  dicaInput.value = '';
  
  showRegisteredDicas();
});

// Lista de dicas cadastradas
function showRegisteredDicas() {
  const dicasList = document.getElementById('dicas-list');
  dicasList.innerHTML = '';
  
  const dicas = JSON.parse(localStorage.getItem('dicas')) || [];
  
  dicas.forEach(function(dica) {
    const li = document.createElement('li');
    li.textContent = `${dica.dica}`;
    li.classList.add(dica.material);
    
    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Excluir';
    deleteButton.addEventListener('click', function() {
      deleteDica(dica);
    });
    
    li.appendChild(deleteButton);
    dicasList.appendChild(li);
  });
}

// Exclusão de dicas de reciclagem
function deleteDica(dica) {
  let dicas = JSON.parse(localStorage.getItem('dicas')) || [];
  
  dicas = dicas.filter(function(item) {
    return item.material !== dica.material || item.dica !== dica.dica;
  });
  
  localStorage.setItem('dicas', JSON.stringify(dicas));
  
  showRegisteredDicas();
}

// Filtro de dicas de reciclagem
document.getElementById('filtrar').addEventListener('click', function() {
  const filtroInput = document.getElementById('filtro-material');
  const filtro = filtroInput.value.toLowerCase();
  
  const dicasList = document.getElementById('dicas-filtradas');
  dicasList.innerHTML = '';
  
  const dicas = JSON.parse(localStorage.getItem('dicas')) || [];
  
  const filteredDicas = dicas.filter(function(dica) {
    return dica.material.toLowerCase().includes(filtro);
  });
  

  
  filteredDicas.forEach(function(dica) {
    const li = document.createElement('li');
    li.textContent = `${dica.material}: ${dica.dica}`;
    li.classList.add(dica.material);
    
    dicasList.appendChild(li);
  });
});

// Ver horários de coleta por bairro
document.getElementById('ver-horarios').addEventListener('click', function() {
  const horariosList = document.getElementById('horarios-list');
  
  if (horariosList.style.display === 'none') {
    horariosList.style.display = 'block';
  } else {
    horariosList.style.display = 'none';
  }
  
  horariosList.innerHTML = '';
  
  const horarios = {
    'Alvorada': ['Terça-feira', 'Quinta-feira', 'Sábado'],
    'Veneza II': ['Segunda-feira', 'Quarta-feira', 'Sexta-feira'],
    'Distrito Administrativo': ['Terça-feira', 'Sexta-feira'],
    'Centro': ['Segunda-feira à Sábado'],
    'Jardim Pérola': ['Terça-feira','Quinta-feira', 'Sábado']
  };
  
  for (const bairro in horarios) {
    const li = document.createElement('li');
    li.textContent = `${bairro}: ${horarios[bairro].join(', ')}`;
    horariosList.appendChild(li);
  }
});

// Ao carregar a página, exibir as dicas cadastradas
window.addEventListener('load', function() {
  showRegisteredDicas();
});
