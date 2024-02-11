function register(){
    const nome = document.getElementById('cadNome').value;
    const userName = document.getElementById('cadUser').value;
    const email = document.getElementById('cadEmail').value;
    const senha = document.getElementById('cadSenha').value;
    let userImg = '';

    fetch(`https://api.github.com/users/${userName}`)
        .then(response => response.json())
        .then((data)=>{
            userImg = `https://avatars.githubusercontent.com/u/${data.id}?v=4`;
            alert(userImg)
            if(nome.trim() !== '' && userName.trim() !== '' && email.trim() !== '' && senha.trim() !== ''){
                const data = {email, nome, userName, userImg, senha};
        
                axios.post('http://localhost:3000/users', data).then(response =>{
                    alert(response.data.mensagem);
                    document.getElementById('cadNome').value = '';
                    document.getElementById('cadUser').value = '';
                    document.getElementById('cadEmail').value = '';
                    document.getElementById('cadSenha').value = '';
                }).catch(error => console.error('Erro:', error));
            }else{
                alert('Por favor, insira um nome válido');
            }
            resolve('Sucesso!!');
        });

}