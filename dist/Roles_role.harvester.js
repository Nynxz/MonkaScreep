//Custom

let roleHarvester = {

    /** @param {Creep} creep **/
    run:function(creep){


        if(creep.memory.mining){
            let sources = creep.room.find(FIND_SOURCES);
            //console.log(sources);
            if(creep.store.getFreeCapacity() == 0){
                creep.memory.mining = false;
                creep.say(" Full!");
            }
            if(!creep.memory.pathBlocked){
                if(creep.harvest(sources[0]) == ERR_NOT_IN_RANGE){
                    if(creep.moveTo(sources[0], {visualizePathStyle: {stroke: 'yellow'}}) == -2){
                        creep.memory.pathBlocked = true;
                        creep.say('Node Busy!');
                    }
                }
            } else {
                if(creep.harvest(sources[1]) == ERR_NOT_IN_RANGE){
                    if(creep.moveTo(sources[1], {visualizePathStyle: {stroke: 'yellow'}}) == -2){
                        creep.memory.pathBlocked = false;
                        creep.say('Node Busy!');
                    }
                }
            }
        } else if (!creep.memory.mining){
            let energyStorages = creep.room.find(FIND_STRUCTURES,
                {filter: (structure) =>
                        ((structure.structureType == STRUCTURE_SPAWN ||
                        structure.structureType == STRUCTURE_EXTENSION) &&
                        structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0) || (structure.structureType == STRUCTURE_CONTAINER)
                    });
            //console.log(energyStorages);
            if(creep.store.getUsedCapacity() == 0) {
                creep.memory.mining = true;
                creep.say(' Empty!');
            }
            //console.log(energyStorages);
            //console.log(Game.spawns['Pink'].store.getFreeCapacity(RESOURCE_ENERGY));
            //console.log(creep.transfer(energyStorages[2], RESOURCE_ENERGY));
            if(creep.transfer(energyStorages[2], RESOURCE_ENERGY) == -9){
                creep.moveTo(energyStorages[2], RESOURCE_ENERGY, {visualizePathStyle: {stroke: 'green'}});
            }
        }
    },
    spawn:function(){
      if(Game.spawns['Pink'].spawnCreep([WORK, CARRY, MOVE, MOVE], 'Harvester' +  Math.floor(Math.random() * 100),
      {memory:{
        role: 'harvester',
        mining: true,
        pathBlocked: false
      }}) == 0){
          console.log("Spawning Harvester..");
      }
    }
}

module.exports = roleHarvester;
