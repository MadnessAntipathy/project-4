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
  var playerArray = Object.values(objects).filter(obj => obj.type === "player")
  for (var i = 0; i < multiplier; i++){
    var randNum = Math.floor(Math.random()*100000)
    var enemyList = [
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
      },
      {
        id: randNum,
        type: "enemy",
        direction: "seeker",
        speed: 1,
        x: Math.floor(Math.random()*500),
        y: Math.floor(Math.random()*500),
        target: playerArray[Math.floor(Math.random()*playerArray.length)],
        move: 0,
        distance: 250
      }
    ]
    objects[randNum] = enemyList[Math.floor(Math.random()*enemyList.length)]
  }
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
