// ###########################################
// CHUCK NORRIS API / FETCH API

const loadJokes: any = async (): Promise<any> =>  {
    try{
        const chuckNorrisFetch: Response = await fetch('https://api.chucknorris.io/jokes/random', {
            headers: {Accept: 'application/json'}
        });
        const jokeData = await chuckNorrisFetch.json();
        const loadingElement = document.getElementById('loadingJoke');
        if (loadingElement) {
            loadingElement.innerHTML = jokeData.value;
        } else {
            console.log("Element with ID 'loadingJoke' not found");
        }
    } catch (error) {
        console.log(`Error fetching joke: ${error}`);
    };
};

document.getElementById('loadJokeBtn')?.addEventListener("click", loadJokes)