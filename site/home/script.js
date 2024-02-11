const login = localStorage.getItem("login");
        const senha = localStorage.getItem("senha");

        let sessao;

        axios.get('http://localhost:3000/users')
                .then(response => {
                    const data = response.data;

                    if (data.length > 0) {
                        data.forEach(user => {
                            if(user.email == login && user.senha == senha){
                                sessao = user;
                                
                                alert(sessao.email)

                                const titulo = document.querySelector('h1');
                                const img = document.querySelector('img');
                                titulo.innerHTML = sessao.userName
                                img.src = sessao.userImg
                            }
                        });
                    } else {
                        alert('erro');
                    }
                })
                .catch(error => console.error('Erro:', error));
