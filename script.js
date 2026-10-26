// Mock Data com Imagens da Internet (Unsplash) para dar um visual real
const produtosMock = [
    { id: 1, nome: "Cuscuz Completo", desc: "Carne de sol, queijo coalho e ovo frito.", preco: 18.50, img: "https://images.unsplash.com/photo-1596797038530-2c107229654b?auto=format&fit=crop&q=80&w=400" },
    { id: 2, nome: "Tapioca de Frango", desc: "Frango desfiado temperado com requeijão cremoso.", preco: 15.00, img: "https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?auto=format&fit=crop&q=80&w=400" },
    { id: 3, nome: "Bolo de Macaxeira", desc: "Fatia generosa do tradicional bolo nordestino.", preco: 8.00, img: "https://images.unsplash.com/photo-1574085733277-851d9d856a3a?auto=format&fit=crop&q=80&w=400" },
    { id: 4, nome: "Suco de Cajá", desc: "Copo 400ml natural feito da polpa fresca.", preco: 7.50, img: "https://images.unsplash.com/photo-1600271886742-f049cd451bba?auto=format&fit=crop&q=80&w=400" },
    { id: 5, nome: "Escondidinho", desc: "Macaxeira com carne seca e queijo gratinado.", preco: 24.90, img: "https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?auto=format&fit=crop&q=80&w=400" },
    { id: 6, nome: "Café Regional", desc: "Café coado na hora acompanhado de queijo coalho.", preco: 12.00, img: "https://images.unsplash.com/photo-1559525839-b184a4d698c7?auto=format&fit=crop&q=80&w=400" }
];

let carrinho = [];

function aceitarLGPD() {
    document.getElementById('lgpdOverlay').classList.add('hidden');
    document.getElementById('mainApp').classList.remove('hidden');
    renderizarCardapio();
}

function renderizarCardapio() {
    const container = document.getElementById('menuContainer');
    container.innerHTML = '';
    
    produtosMock.forEach(produto => {
        const div = document.createElement('div');
        div.className = 'card';
        div.innerHTML = `
            <img src="${produto.img}" alt="${produto.nome}" class="card-img">
            <div class="card-content">
                <div class="card-info">
                    <h3>${produto.nome}</h3>
                    <p>${produto.desc}</p>
                </div>
                <div class="card-footer">
                    <span class="preco">R$ ${produto.preco.toFixed(2)}</span>
                    <button class="btn btn-primary" onclick="adicionarAoCarrinho(${produto.id})">
                        <i class="fa-solid fa-plus"></i> Adicionar
                    </button>
                </div>
            </div>
        `;
        container.appendChild(div);
    });
}

function adicionarAoCarrinho(idProduto) {
    const produto = produtosMock.find(p => p.id === idProduto);
    carrinho.push(produto);
    atualizarInterfaceCarrinho();
}

function removerDoCarrinho(index) {
    carrinho.splice(index, 1);
    atualizarInterfaceCarrinho();
}

function atualizarInterfaceCarrinho() {
    const container = document.getElementById('cartItems');
    let total = carrinho.reduce((acc, item) => acc + item.preco, 0);
    document.getElementById('cartTotal').innerText = total.toFixed(2);
    
    if (carrinho.length === 0) {
        container.innerHTML = '<div class="empty-cart"><i class="fa-solid fa-basket-shopping"></i><p>O carrinho está vazio.</p></div>';
        return;
    }

    container.innerHTML = '';
    carrinho.forEach((item, index) => {
        const row = document.createElement('div');
        row.className = 'cart-item-row';
        row.innerHTML = `
            <span>${item.nome}</span>
            <div>
                <strong>R$ ${item.preco.toFixed(2)}</strong>
                <button class="btn-remove" onclick="removerDoCarrinho(${index})" title="Remover"><i class="fa-solid fa-trash"></i></button>
            </div>
        `;
        container.appendChild(row);
    });
}

function processarPagamento() {
    if (carrinho.length === 0) {
        alert("O carrinho está vazio. Adicione itens antes de pagar.");
        return;
    }

    const statusDiv = document.getElementById('paymentStatus');
    statusDiv.style.color = "var(--text-muted)";
    statusDiv.innerHTML = '<i class="fa-solid fa-circle-notch fa-spin"></i> A redirecionar para o serviço de pagamento...';

    setTimeout(() => {
        statusDiv.style.color = "var(--success-color)";
        statusDiv.innerHTML = '<i class="fa-solid fa-circle-check"></i> Pagamento Aprovado! O pedido foi para a cozinha.';
        
        carrinho = [];
        atualizarInterfaceCarrinho();
        
        setTimeout(() => statusDiv.innerText = "", 5000);
    }, 2500);
}