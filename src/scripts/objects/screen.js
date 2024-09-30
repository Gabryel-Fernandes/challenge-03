const screen = {
    userProfile: document.querySelector('.profile-data'),
    renderUser(user) {
        this.userProfile.innerHTML = `<div class="info">
                                                <img class="profile-image" src="${user.avatarUrl}" alt="Foto de perfil do usuário"/>

                                                <div class="Data">
                                                    <h1>${user.name ?? 'Não possui nome cadastrado 🤦‍♂️'}</h1>
                                                    <p>${user.bio ?? 'Não possui bio cadastrada 🤦‍♂️'}</p>
                                                <div class="container-social">

                                                <div class="social-block">
                                                    <p><strong>Followers:</strong>${user.followers}</p>
                                                </div>

                                                <div class="social-block">
                                                    <p><strong>Following:</strong> ${user.following}</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>`

        let repositoriesItens = ''
        user.repositories.forEach(repo => repositoriesItens += `<li>
                                                                    <div class="repository">
                                                                        <a href="${repo.html_url}" target="_blank">${repo.name}</a>
                                                                        <div class="repository-data">
                                                                            <p>🛣️${repo.forks_count}</p>
                                                                            <p>⭐${repo.stargazers_count}</p>
                                                                            <p>🔍${repo.watchers_count}</p>
                                                                            <p>🌐${repo.language}</p>
                                                                        </div>
                                                                    </div>
                                                                </li>`)
        if (user.repositories.length > 0) {
            this.userProfile.innerHTML += `<div class="repositories section">
                                                <h2>Repositórios</h2>
                                                <ul>${repositoriesItens}</ul>
                                          </div>`
        }

        let eventlist = ''
        user.events.forEach(event => {
            let commitMessages = '';

            if (event.type === 'PushEvent') {
                event.payload.commits.forEach(commit => {
                    commitMessages += `<p class="limited-text">${commit.message}</p>`;
                })

                eventlist += `<li><Strong class="limited-text">${event.repo.name}</strong> ${commitMessages}</li>`
            } else if (event.type === 'CreatEvent') {
                commitMessages += '<p>Sem mensagem de commit</P>'
            }
        })

        if (user.events.length > 0) {
        this.userProfile.innerHTML += `<div class="events">
                                            <h1>Eventos</h1>
                                            <ul>${eventlist}</ul>
                                        </div>`
        }
    },
    
    renderNotFound(){
        this.userProfile.innerHTML = "<h3>Usúario não encontrado</h3>";
    }
}

export { screen }