document.getElementById('btn-search').addEventListener('click', () => {
    const userName = document.getElementById('input-search').value;
    getUserProfile(userName);
})

document.getElementById('input-search').addEventListener('keyup', (e) => {
    const userName = e.target.value;
    const key = e.which || e.keyCode;
    const isEnterKeyPressed = key === 13;
    if (isEnterKeyPressed) {
        getUserProfile(userName);
    }
})

async function user(userName) {
    const response = await fetch(`https://api.github.com/users/${userName}`)
    return await response.json();
}

async function repos(userName) {
    const response = await fetch(`https://api.github.com/users/${userName}/repos`)
    return await response.json();
}

async function events(userName) {
    const response = await fetch(`https://api.github.com/users/${userName}/events?per_page=10`)
    return await response.json();
}


console.log(await repos("Gabryel-Fernandes"));
function getUserProfile(userName) {

    user(userName).then(userData => {

        let userInfo = `<div class="info">
                            <img class="profile-image" src="${userData.avatar_url}" alt="Foto de perfil do usuário"/>
                            <div class="Data">
                                <h1>${userData.name ?? 'Não possui nome cadastrado 🤦‍♂️'}</h1>
                                <p>${userData.bio ?? 'Não possui bio cadastrada 🤦‍♂️'}</p>
                                <div class="container-social">
                                    <div class="social-block">
                                        <p><strong>Followers:</strong>${userData.followers}</p>
                                    </div>
                                    <div class="social-block">
                                        <p><strong>Following:</strong> ${userData.following}</p>
                                    </div>
                                </div>
                            </div>
                        </div>`;

        document.querySelector('.profile-data').innerHTML = userInfo;


        getUserRepositories(userName)
        getUserEvents(userName)
    })
}

function getUserRepositories(userName) {
    repos(userName).then(reposData => {
        let repositoriesItens = "";

        reposData.forEach(repo => {
            repositoriesItens += `<li>
                                    <div class="repository">
                                        <a href="${repo.html_url}" target="_blank">${repo.name}</a>
                                        <div class="repository-data">
                                            <p>🛣️${repo.forks_count}</p>
                                            <p>⭐${repo.stargazers_count}</p>
                                            <p>🔍${repo.watchers_count}</p>
                                            <p>🌐${repo.language}</p>
                                        </div>
                                    </div>
                                 </li>`
        });

        document.querySelector('.profile-data').innerHTML += `<div class="repositories section">
                                                                <h2>Repositórios</h2>
                                                                <ul>${repositoriesItens}</ul>
                                                             </div>`
    });
}

function getUserEvents(userName) {
    events(userName).then(eventsData => {
        let eventlist = "";

        eventsData.forEach(event => {

            let commitMessages = '';

            if (event.type === 'PushEvent') {
                event.payload.commits.forEach(commit => {
                    commitMessages += `<p class="limited-text">${commit.message}</p>`;
                })

                eventlist += `<li><Strong class="limited-text">${event.repo.name}</strong> ${commitMessages}</li>`
            } else if (event.type === 'CreatEvent') {
                commitMessages += '<p>Sem mensagem de commit</P>'
            }
        });

        document.querySelector('.profile-data').innerHTML += `<div class="events">
                                                                <h1>Eventos</h1>
                                                                <ul>${eventlist}</ul>
                                                            </div>`
    })
}



