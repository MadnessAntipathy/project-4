console.log("works")
module.exports.player = {}

module.exports.collision = function (solo, group){
  console.log(solo)
  console.log(group)
}

// class GameMap extends React.Component{
//   constructor(){
//     super()
//     this.state = {
//       players:[],
//       enemies:[],
//       player: {}
//     }
//   }
//
//   generatePlayer(){
//     let player = new Player
//     console.log(player)
//     this.setState({players:[player,...this.state.players], player: player})
//     console.log(player.posX, player.posY)
//     var unit = document.createElement("div")
//     unit.id = player.uniqueid
//     unit.style.position = "absolute"
//     unit.style.height = "10px"
//     unit.style.width = "10px"
//     unit.style.backgroundColor = "white"
//     unit.style.top = player.posY+"px"
//     unit.style.left = player.posX+"px"
//     document.querySelector("#map").appendChild(unit)
//   }
//
//   getPlayerData(input){
//       let player = this.state.players.find((obj)=>{
//         return obj.uniqueid === this.state.player.uniqueid
//       })
//       let index = this.state.players.findIndex(obj=>obj.uniqueid === this.state.player.uniqueid)
//
//       if (input.up && player.posY>0){
//         this.setState(state=>{
//           state.player.directions.up = true
//         })
//         // player.posY -= 1
//       }else{
//         this.setState(state=>{
//           state.player.directions.up = false
//         })
//       }
//       if (input.down && player.posY<500){
//         this.setState(state=>{
//           state.player.directions.down = true
//         })
//         // player.posY += 1
//       }else{
//         this.setState(state=>{
//           state.player.directions.down = false
//         })
//       }
//       if (input.left && player.posX>0){
//         this.setState(state=>{
//           state.player.directions.left = true
//         })
//         // player.posX -= 1
//       }else{
//         this.setState(state=>{
//           state.player.directions.left = false
//         })
//       }
//       if (input.right && player.posX<500){
//         this.setState(state=>{
//           state.player.directions.right = true
//         })
//         // player.posX += 1
//       }else{
//         this.setState(state=>{
//           state.player.directions.right = false
//         })
//       }
//   }
//
//   calculateMove(){
//     let player = this.state.players.find((obj)=>{
//       return obj.uniqueid === this.state.player.uniqueid
//     })
//     if (player){
//       if (this.state.player.directions.up){
//           player.posY -= 1
//       }
//       if (this.state.player.directions.down){
//           player.posY += 1
//       }
//       if (this.state.player.directions.left){
//           player.posX -= 1
//       }
//       if (this.state.player.directions.right){
//           player.posX += 1
//       }
//     }
//   }
//
//   componentDidMount(){
//     setInterval(()=>{
//       this.calculateMove()
//       this.updatePlayerData()
//       this.detectCollision()
//     },10)
//   }
//
//   updatePlayerData(){
//     this.state.players.forEach((obj)=>{
//       let string = "#"+obj.uniqueid
//       let unit = document.querySelector(string)
//       unit.style.top = obj.posY+"px"
//       unit.style.left = obj.posX+"px"
//     })
//   }
//
//   checkPlayers(){
//     console.log(this.state.players)
//     console.log(this.state.player)
//   }
//
//   detectCollision(){
//     this.state.players.forEach(obj=>{
//       this.state.enemies.forEach(ene=>{
//         if (obj.posX < ene.posX+50 && obj.posX+10 > ene.posX && obj.posY+10 > ene.posY && obj.posY < ene.posY+50){
//           console.log("hit!!!!!!")
//           let string = "#"+obj.uniqueid
//           let dom = document.querySelector(string)
//           dom.parentNode.removeChild(dom)
//           console.log(this.state.players.filter(object=>object.uniqueid === obj.uniqueid))
//           // this.setState({players:this.state.players, player:{}})
//           console.log(this.state.players)
//         }
//       })
//     })
//   }
//
//
//   generateEnemy(){
//
//     let enemy = new Enemy
//     this.setState({enemies:[enemy,...this.state.enemies]})
//     var unit = document.createElement("div")
//     unit.id = enemy.uniqueid
//     unit.style.position = "absolute"
//     unit.style.height = "50px"
//     unit.style.width = "50px"
//     unit.style.backgroundColor = "red"
//     unit.style.top = enemy.posY+"px"
//     unit.style.left = enemy.posX+"px"
//     document.querySelector("#map").appendChild(unit)
//   }
//
//   render(){
//
//     return(
//       <div>
//         <div id="map" style={{backgroundColor:"black", height: "100vh", width: "100vw"}}></div>
//         <PlayerControls getPlayerData={this.getPlayerData.bind(this)}/>
//         <button onClick={this.generatePlayer.bind(this)}>Load player</button>
//         <button onClick={this.checkPlayers.bind(this)}>Check players</button>
//         <button onClick={this.generateEnemy.bind(this)}>Generate enemy</button>
//       </div>
//     )
//   }
// }
//
// class Enemy{
//   constructor(){
//     this.uniqueid= Math.random()*10000
//     this.posX= 500
//     this.posY= 500
//   }
// }
//
// class Player{
//   constructor(){
//     this.uniqueid= "something"
//     this.posX= 500
//     this.posY= 500
//     this.directions={
//         up:false,
//         down:false,
//         left:false,
//         right:false
//     }
//   }
// }
//
// class PlayerControls extends React.Component{
//   constructor(){
//     super()
//     this.state={
//       player:{
//         up: false,
//         down: false,
//         left: false,
//         right: false
//       }
//     }
//   }
//   componentDidMount(){
//     document.addEventListener("keydown", this.keydown.bind(this), false);
//     document.addEventListener("keyup", this.keyup.bind(this), false);
//   }
//   keydown(e){
//     e.preventDefault()
//       if (e.which === 38){
//         this.setState((state)=>{
//           state.player.up = true
//         })
//       }
//       if (e.which === 40){
//         this.setState((state)=>{
//           state.player.down = true
//         })
//       }
//       if (e.which === 37){
//         this.setState((state)=>{
//           state.player.left = true
//         })
//       }
//       if (e.which === 39){
//         this.setState((state)=>{
//           state.player.right = true
//         })
//       }
//       this.props.getPlayerData(this.state.player)
//   }
//   keyup(e){
//     e.preventDefault()
//       if (e.which === 38){
//         this.setState((state)=>{
//           state.player.up = false
//         })
//       }
//       if (e.which === 40){
//         this.setState((state)=>{
//           state.player.down = false
//         })
//       }
//       if (e.which === 37){
//         this.setState((state)=>{
//           state.player.left = false
//         })
//       }
//       if (e.which === 39){
//         this.setState((state)=>{
//           state.player.right = false
//         })
//       }
//     this.props.getPlayerData(this.state.player)
//   }
//
//   render(){
//     return(
//       <div></div>
//     )
//   }
// }
//
// class PlayerModel extends React.Component{
//   render(){
//     return(
//       <div id={this.props.uniqueid}style={{position:"absolute",left: this.props.player.posX, top: this.props.player.posY, height: "20px", width: "20px"}}></div>
//     )
//   }
// }
//
// ReactDOM.render(
//   <App/>,
//   document.querySelector("#root")
// )