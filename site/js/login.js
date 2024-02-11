

function login(){
    axios.get('http://localhost:3000/users')
                .then(response => {
                    const data = response.data;
                    const logEmail = document.getElementById('logEmail').value;
                    const logSenha = document.getElementById('logSenha').value;
                    

                    if (data.length > 0) {
                        data.forEach(user => {
                            if(user.email == logEmail && user.senha == logSenha){
                                localStorage.setItem("login", user.email);
                                localStorage.setItem("senha", user.senha);
                                window.location.href = "home/";
                            }
                        });
                    } else {
                        outputDiv.innerHTML = '<p>Nenhum item encontrado.</p>';
                    }
                })
                .catch(error => console.error('Erro:', error));
}