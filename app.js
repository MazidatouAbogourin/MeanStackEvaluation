
const API =(()=>{

    const generateArray =()=>{
        let arr=[];

        for(let i=1; i< 13; i++){
            let newly={
                id: i,
                status: false

            }

            arr.push(newly);

        }

        return arr;
    }


    return{
        generateArray,
    }
})()
 const arr =API.generateArray();

const View=(()=>{
    let btnStart = document.querySelector(".start");

    const showImages=(arr)=>{
       clearAllElement()
        arr.forEach(element => {
            const item = document.querySelector(`#num_${element.id}`);
            const imgElement= document.createElement('img');
            imgElement.src='./display.jpg';
            imgElement.width=200;
            imgElement.classList.add('img_ref');
            imgElement.id=element.id;
            imgElement.height=200;
            item.appendChild(imgElement);
            
            
        });

    }

    const clearAllElement=()=>{
        const elements= document.querySelectorAll(".item_circle");

        elements.forEach(el=>{
            el.innerHTML=" ";
        })

    }

    const displayAllSnakes=()=>{
        clearAllElement();
        const elements= document.querySelectorAll(".item_circle");
        elements.forEach(el=>{
            const imgElement= document.createElement('img');
            imgElement.src='./snakepic.jpg';
            imgElement.width=200;
            imgElement.classList.add('snakepic.jpg')
            imgElement.height=200;
            el.appendChild(imgElement)
        })

    }

    const displaySnake=(id)=>{
        const item = document.querySelector(`#num_${id}`);
            const imgElement= document.createElement('img');
            imgElement.src='./snakepic.jpg';
            imgElement.width=200;
            imgElement.classList.add('img_bad');
            imgElement.height=200;
            item.appendChild(imgElement);         

    }

    return{
        btnStart,
        showImages,
        clearAllElement,
        displaySnake,
        displayAllSnakes
    }

})();

const Model=((View, model)=>{
    class Game{
        #gameboard=[];

        set gameBoard(newGameBoard){
            this.#gameboard = newGameBoard;
        }

        get gameBoard(){
            return this.#gameboard;
        }

        changeGameBoard(id){

            this.#gameboard= this.#gameboard.map(el=> el.id !=id? el : {...el, status: true} );
            console.log(this.#gameboard);
        }

        returnItems(elements){
            return this.#gameboard.filter(el=> elements.includes(el.id));
        }
    }
    return{
        Game
    }
})();

const Controller =((view, model)=>{
    const state= new model.Game();
    let winnings=0;
    let intervalID;
    let intervalID2
    let count;
    const startGame=()=>{
        view.clearAllElement();
        winnings=0;
        document.querySelector("#score").textContent=winnings;
        count=30;
        intervalID= setInterval(()=>{
            count--;
            document.getElementById('timer').innerHTML= count;
            let numbers=[]
        for(let i=0; i<3; i++){
            numbers.push(Math.floor(1+Math.random()*12));

        }
    
        const items= state.returnItems(numbers);
       
        view.showImages(items)

            if(count==0){
                alert ("Time is up");
                clearInterval(intervalID2);
                clearInterval(intervalID);
            }

        }, 1000)
        
    
          intervalID2= setInterval(()=>{
            // document.querySelector(".img_bad").remove();
           let luck= Math.floor(1+Math.random()*12);
            view.displaySnake(luck)
            if(count===0){
                clearInterval(intervalID2);
            }
            
        }, 2000);

        

    }

    const increaseCount =(e)=>{
        e.preventDefault();
        if(e.target.classList.contains("img_ref")){
            e.target.remove();
            winnings++
            document.querySelector("#score").textContent=winnings;

            state.changeGameBoard(e.target.id)
        }

        if(e.target.classList.contains("img_bad")){
            console.log("clicked on a snale")
           clearInterval(intervalID);
           clearInterval(intervalID2);
           document.getElementById('timer').textContent=0;
            view.displayAllSnakes();
            
        }

  
    }


    const init =()=>{
        state.gameBoard=arr;
        
        view.btnStart.addEventListener('click', startGame);
        document.querySelector(".container_Circle").addEventListener('click', increaseCount);

    }

    return{
        init
    }
})(View, Model);

Controller.init();