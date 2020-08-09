let roleBuilder = {

    /** @param {Creep} creep **/
    run: function(creep) {
        if(creep.memory.building && creep.store[RESOURCE_ENERGY] === 0) {
            creep.memory.building = false;
            creep.say('🔄 harvest');
        }
        if(!creep.memory.building && creep.store.getFreeCapacity() === 0) {
            creep.memory.building = true;
            creep.say('🚧 build');
        }

        if(creep.memory.building) {
            let targets = creep.room.find(FIND_CONSTRUCTION_SITES);
            if(targets.length) {
                if(creep.build(targets[0]) === ERR_NOT_IN_RANGE) {
                    creep.moveTo(targets[0], {visualizePathStyle: {stroke: '#ffffff'}});
                }
            } else {
              let ramparts = creep.room.find(FIND_STRUCTURES, {filter: structure => {return structure.structureType == STRUCTURE_RAMPART && structure.hits < 20000}});
              let closest = creep.pos.findClosestByRange(ramparts);
              //console.log(closest);
              //console.log(ramparts);
              if(creep.repair(closest) == ERR_NOT_IN_RANGE) {
                creep.moveTo(closest, {visualizePathStyle: {stroke: '#ffffff'}});
              }
            }
        } else { //Not Building
          let manual = 1;

          if(manual == 0 ){
            let sources = creep.room.find(FIND_STRUCTURES, { filter: { structureType: STRUCTURE_CONTAINER}});
            if(creep.withdraw(sources[1], RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
              creep.moveTo(sources[1], {visualizePathStyle: {stroke: '#ffaa00'}});
            }
          } else {
            let sources = creep.room.find(FIND_SOURCES);
            if(creep.harvest(sources[1]) == ERR_NOT_IN_RANGE){
              creep.moveTo(sources[1], {visualizePathStyle: {stroke: '#ffaa00'}});
            }
          }
        }
    },
    spawn:function() {
      if(Game.spawns['Pink'].spawnCreep([WORK, WORK, CARRY, MOVE, MOVE], 'Builder' +  Math.floor(Math.random() * 100),
          {memory:{
            role:'builder',
            building: false
          }}) == 0) {
            console.log("Spawning Builder..");
      }
    }
}

module.exports = roleBuilder;
