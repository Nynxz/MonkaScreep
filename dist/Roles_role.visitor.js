let roleVisitor = {
  /** @param {Creep} creep **/
  run:function(creep){
    let targetPos = new RoomPosition(26, 30, 'W4S26');
    //console.log(targetPos);
    creep.moveTo(targetPos, {visualizePathStyle: {stroke: '#ffffff'}});
    //console.log(creep.moveTo(targetPos));
  },
  spawn:function(){
    console.log('Spawning Visitor');
    Game.spawns['Pink'].spawnCreep([WORK, CARRY, MOVE], "NotABadGuy" + Math.floor(Math.random() * 100), {memory:{role: 'visitor'}});
  }
}

module.exports = roleVisitor;
