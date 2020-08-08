let roleLogistics = {

  /** @param {Creep} creep **/
  run:function(creep){
    if(!creep.memory.full){
      creep.room.find(FIND_STRUCTURES)
    }
  },
  spawn:function(level){
    if(level == 1){
      Game.spawns['Pink'].spawnCreep([CARRY, CARRY, MOVE], 'LogisticsR' + Math.floor(Math.random() * 100), {memory:{role: 'logistics', full: false}});
    }
  }
}

module.exports = roleLogistics;
