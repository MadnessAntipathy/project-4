const index = require('../index.js');

const objects = {}
const playerArray = []

module.exports.createPlayerObject = function(input){
  objects[input.id] = input
}

module.exports.returnObjectList = function(){
  return objects
}

module.exports.returnArrayList = function(){
  return playerArray
}

module.exports.clearObjectList = function(){
  for (var key in objects){
    if (objects.hasOwnProperty(key)){
      delete objects[key];
    }
  }
}

module.exports.spawnEnemy = function(speed, multiplier){
  var alertState = {
    type: "warning",
    color: "black",
    x: Math.floor(Math.random()*500),
    y: Math.floor(Math.random()*500)
  }
  if (multiplier % 5 === 4){
    if (!objects["alertState"]){
      objects["alertState"] = alertState
    }
    objects["alertState"].color = "yellow"
  }else if (multiplier % 5 === 0){
    objects["alertState"].color = "purple"
  }else {
    if (objects["alertState"]){
      delete objects["alertState"]
    }
  }

  var playerList = Object.values(objects).filter(obj => obj.type === "player")
  for (var i = 0; i < multiplier; i++){
    var enemyObject = returnEnemyList(speed,playerList)
    objects[enemyObject.id] = enemyObject.enemy
  }
  if (multiplier % 5 === 0){
    for (var j = 0; j < playerList.length; j++){
      var seekerObject = returnSeeker()
      objects[seekerObject.id] = seekerObject
      if (playerList[j]){
        objects[seekerObject.id].target = playerList[j]
      }
    }
  }
}

function returnSeeker (speed){
  var randNum = Math.floor(Math.random()*1000000)
  return {
    id: randNum,
    type: "enemy",
    direction: "seeker",
    speed: 1,
    x: objects["alertState"].x,
    y: objects["alertState"].y,
    target: "playerList[Math.floor(Math.random()*playerList.length)]",
    move: 0,
    distance: 500
  }
}

function returnEnemyList (speed,playerList){
  var randNum = Math.floor(Math.random()*1000000)
  var enemyList = [
    // {
    //   id: randNum,
    //   type: "enemy",
    //   direction: "up",
    //   speed: speed,
    //   x: 0,
    //   y: 500,
    //   endY: 0,
    //   move: 0,
    //   distance: 500
    // }
    // {
    //   id: randNum,
    //   type: "enemy",
    //   direction: "seeker",
    //   speed: 1,
    //   x: Math.floor(Math.random()*500),
    //   y: Math.floor(Math.random()*500),
    //   target: playerList[Math.floor(Math.random()*playerList.length)],
    //   move: 0,
    //   distance: 250
    // }
    {
      id: randNum,
      type: "enemy",
      direction: "up",
      speed: speed,
      x: Math.floor(Math.random()*500),
      y: 500,
      endY: 0,
      move: 0,
      distance: 500
    },
    {
      id: randNum,
      type: "enemy",
      direction: "down",
      speed: speed,
      x: Math.floor(Math.random()*500),
      y: 0,
      endY: 500,
      move: 0,
      distance: 500
    },
    {
      id: randNum,
      type: "enemy",
      direction: "left",
      speed: speed,
      x: 500,
      y: Math.floor(Math.random()*500),
      endX: 0,
      move: 0,
      distance: 500
    },
    {
      id: randNum,
      type: "enemy",
      direction: "right",
      speed: speed,
      x: 0,
      y: Math.floor(Math.random()*500),
      endX: 500,
      move: 0,
      distance: 500
    }
  ]
  //do any modifiers before the 'data' object such as pushing more info into the array
  var data = {
    id: randNum,
    enemy: enemyList[Math.floor(Math.random()*enemyList.length)]
  }
  return data
}

module.exports.enemyMove = function(){
  for (var key in objects){
    if (objects.hasOwnProperty(key)){
      if (objects[key].type === "enemy"){
        if (objects[key].direction === "up"){
          objects[key].y -= objects[key].speed
          objects[key].move += objects[key].speed
        }
        if (objects[key].direction === "down"){
          objects[key].y += objects[key].speed
          objects[key].move += objects[key].speed
        }
        if (objects[key].direction === "left"){
          objects[key].x -= objects[key].speed
          objects[key].move += objects[key].speed
        }
        if (objects[key].direction === "right"){
          objects[key].x += objects[key].speed
          objects[key].move += objects[key].speed
        }
        if (objects[key].direction === "seeker"){
          if (objects[key].x < objects[key].target.x){
            objects[key].x += objects[key].speed
          }
          if (objects[key].x > objects[key].target.x){
            objects[key].x -= objects[key].speed
          }
          if (objects[key].y > objects[key].target.y){
            objects[key].y -= objects[key].speed
          }
          if (objects[key].y < objects[key].target.y){
            objects[key].y += objects[key].speed
          }
          objects[key].move += objects[key].speed
        }

        if (objects[key].move >= objects[key].distance){
          if (objects[key].direction === "seeker"){
            objects[key].target.score +=1
          }else {
            for (var keyEntry in objects){
              if (objects.hasOwnProperty(keyEntry)){
                if (objects[keyEntry].type === 'player'){
                  objects[keyEntry].score+=1
                }
              }
            }
          }
          delete objects[key]
        }
      }
    }
  }
}

module.exports.detectCollision = function (){
  var array = []
  for (var key in objects){
    if (objects.hasOwnProperty(key)){
      array.push(objects[key])
    }
  }
  for (var i = 0; i < array.length; i++){
    if (array[i].type === 'player'){
      while(objects[array[i].id].y+10 > 500){
        objects[array[i].id].y -=1
      }
      while(objects[array[i].id].y < 0){
        objects[array[i].id].y +=1
      }
      while(objects[array[i].id].x < 0){
        objects[array[i].id].x +=1
      }
      while(objects[array[i].id].x+10 > 500){
        objects[array[i].id].x -=1
      }
      for (var j = 0; j < array.length; j++){
        if (array[j].type === 'player' && array[i].id !== array[j].id){
          if (array[i].x+10 > array[j].x && array[i].x < array[j].x+10 && array[i].y+10 > array[j].y && array[i].y < array[j].y+10){

            if (objects[array[i].id].lastDirection === "up" && objects[array[j].id].lastDirection === "up"){
              objects[array[i].id].y += 10
              objects[array[j].id].y -= 20

            }else if (objects[array[i].id].lastDirection === "up" && objects[array[j].id].lastDirection === "down"){
              objects[array[i].id].y += 20
              objects[array[j].id].y -= 20

            }else if (objects[array[i].id].lastDirection === "up" && objects[array[j].id].lastDirection === "left"){
              objects[array[i].id].y += 10
              objects[array[j].id].y -= 20

            }else if (objects[array[i].id].lastDirection === "up" && objects[array[j].id].lastDirection === "right"){
              objects[array[i].id].y += 10
              objects[array[j].id].y -= 20

            }

            if (objects[array[i].id].lastDirection === "down" && objects[array[j].id].lastDirection === "up"){
              objects[array[i].id].y -= 20
              objects[array[j].id].y += 20

            }else if (objects[array[i].id].lastDirection === "down" && objects[array[j].id].lastDirection === "down"){
              objects[array[i].id].y -= 10
              objects[array[j].id].y += 20

            }else if (objects[array[i].id].lastDirection === "down" && objects[array[j].id].lastDirection === "left"){
              objects[array[i].id].y -= 10
              objects[array[j].id].y += 20

            }else if (objects[array[i].id].lastDirection === "down" && objects[array[j].id].lastDirection === "right"){
              objects[array[i].id].y -= 10
              objects[array[j].id].y += 20

            }

            if (objects[array[i].id].lastDirection === "left" && objects[array[j].id].lastDirection === "up"){
              objects[array[i].id].x += 10
              objects[array[j].id].x -= 20

            }else if (objects[array[i].id].lastDirection === "left" && objects[array[j].id].lastDirection === "down"){
              objects[array[i].id].x += 10
              objects[array[j].id].x -= 20

            }else if (objects[array[i].id].lastDirection === "left" && objects[array[j].id].lastDirection === "left"){
              objects[array[i].id].x += 10
              objects[array[j].id].x -= 20

            }else if (objects[array[i].id].lastDirection === "left" && objects[array[j].id].lastDirection === "right"){
              objects[array[i].id].x += 20
              objects[array[j].id].x -= 20

            }

            if (objects[array[i].id].lastDirection === "right" && objects[array[j].id].lastDirection === "up"){
              objects[array[i].id].x -= 10
              objects[array[j].id].x += 20

            }else if (objects[array[i].id].lastDirection === "right" && objects[array[j].id].lastDirection === "down"){
              objects[array[i].id].x -= 10
              objects[array[j].id].x += 20

            }else if (objects[array[i].id].lastDirection === "right" && objects[array[j].id].lastDirection === "left"){
              objects[array[i].id].x -= 20
              objects[array[j].id].x += 20

            }else if (objects[array[i].id].lastDirection === "right" && objects[array[j].id].lastDirection === "right"){
              objects[array[i].id].x -= 10
              objects[array[j].id].x += 20
            }
          }
        }else if (array[j].type === 'enemy'){
          if (array[i].x+10 > array[j].x && array[i].x < array[j].x+10 && array[i].y+10 > array[j].y && array[i].y < array[j].y+10){

            index.getDeadPlayer(objects[array[i].id])
            delete objects[array[i].id]
            delete objects[array[j].id]
            playerArray.pop()
          }
        }
      }
    }
  }
}
