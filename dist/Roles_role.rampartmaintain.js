let roleRampartMaintainer = {

    spawn:function(){
      Game.spawns['Pink'].spawnCreep([WORK, CARRY, MOVE], 'RampartMaintainer' + Math.floor(Math.random() * 100), {memory:{role: 'rampartmaintainer', building: false}});
    },

    /** @param {Creep} creep **/
    run:function(creep){
    //  console.log(');
      if(creep.store.getFreeCapacity() == 0){
        //console.log('full');
        creep.memory.building = true;
      }
      if (creep.store.getUsedCapacity() == 0){
        //console.log('empty');
        creep.memory.building = false;
      }


        if(!(creep.memory.building)){
          let containers = creep.room.find(FIND_STRUCTURES, { filter: (structure) => (structure.structureType == STRUCTURE_CONTAINER) && (structure.store.getUsedCapacity(RESOURCE_ENERGY) != 0) })
          //console.log("LOG: " + "Not Empty: " + containers);
          if (creep.withdraw(containers[1], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
            creep.moveTo(containers[1]);
          }

          //let sources = creep.room.find(FIND_SOURCES);
          //if(creep.harvest(sources[0]) === ERR_NOT_IN_RANGE){
          //  creep.moveTo(sources[0], {visualizePathStyle: {stroke: '#ffffff'}});
          //}
        } else if (creep.memory.building){                //{filter:{structureType: STRUCTURE_RAMPART}}
          let ramparts = creep.room.find(FIND_STRUCTURES, {filter: structure => {return structure.structureType == STRUCTURE_RAMPART && structure.hits < 20000}});
          //console.log(ramparts);
          for(rampart in ramparts){
            if(rampart.hits < 50){
              ramparts[0] = rampart;
            }
          }
          //console.log(ramparts);
          if(creep.repair(ramparts[0]) == ERR_NOT_IN_RANGE) {
            creep.moveTo(ramparts[0], {visualizePathStyle: {stroke: '#ffffff'}});
          }
        }
    }
}

module.exports = roleRampartMaintainer;
