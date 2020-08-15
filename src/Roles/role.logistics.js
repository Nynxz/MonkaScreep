let roleLogistics = {

  /** @param {Creep} creep **/
  run: function (creep) {
    //console.log(creep.memory.full);



    if (creep.memory.full) {
      if (creep.store.getUsedCapacity() == 0) {
        //console.log("EMPTY");
        creep.memory.full = false;
      }
      let spawns_extensions = creep.room.find(FIND_STRUCTURES, {
        filter: (structure) =>
          ((structure.structureType == STRUCTURE_SPAWN ||
            structure.structureType == STRUCTURE_EXTENSION ||
            structure.structureType == STRUCTURE_TOWER) &&
            structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0)
      });
      //console.log(creep.transfer(spawns_extensions[0], RESOURCE_ENERGY));
      if (creep.transfer(spawns_extensions[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
        creep.moveTo(spawns_extensions[0]);
      } else if(creep.transfer(spawns_extensions[0], RESOURCE_ENERGY) == ERR_INVALID_TARGET){
        //Merge
        let containers = creep.room.find(FIND_STRUCTURES, { filter: (structure) => (structure.structureType == STRUCTURE_CONTAINER && structure.store.getFreeCapacity() != 0) });
        if(creep.transfer(containers[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE){
          creep.moveTo(containers[0]);
        }
      }
    } else {

      if (creep.store.getFreeCapacity() == 0) {
        //console.log("FULL");
        creep.memory.full = true;
      }

      let containers = creep.room.find(FIND_STRUCTURES, { filter: (structure) => (structure.structureType == STRUCTURE_CONTAINER) && (structure.store.getUsedCapacity(RESOURCE_ENERGY) != 0) })
      //console.log("LOG: " + "Not Empty: " + containers);
      if (creep.withdraw(containers[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
        creep.moveTo(containers[0]);
      }
    }
  },



  spawn: function () {
    console.log("Trying to spawn LOG..");
    if (Game.spawns['Pink'].spawnCreep([CARRY, CARRY, CARRY, CARRY, MOVE, MOVE], 'LogisticsR' + Math.floor(Math.random() * 100), { memory: { role: 'logistics', full: false } }) == 0) {
      console.log("Spawning LOG..");
    }
  }
}

module.exports = roleLogistics;
