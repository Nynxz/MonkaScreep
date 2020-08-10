var roleUpgrader = {

    /** @param {Creep} creep **/
    run: function(creep) {

        if(creep.memory.upgrading && creep.store[RESOURCE_ENERGY] == 0) {
            creep.memory.upgrading = false;
            creep.say('🔄 harvest');
        }
        if(!creep.memory.upgrading && creep.store.getFreeCapacity() == 0) {
            creep.memory.upgrading = true;
            creep.say('⚡ upgrade');
        }

        if(creep.memory.upgrading) {
            if(creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE) {
                 creep.moveTo(creep.room.controller, {visualizePathStyle: {stroke: '#ffffff'}});
             }
            // let targets = creep.room.find(FIND_CONSTRUCTION_SITES);
            // if(creep.build(targets[1]) == ERR_NOT_IN_RANGE) {
            //     creep.moveTo(targets[1], {visualizePathStyle: {stroke: '#ffffff'}});
            // }
        }
        else {
            let manual = 0;

            if(manual == 0 ){
              let closestContainer = Game.getObjectById(creep.room.memory.containerClosestToControllerID);
              //console.log(sources);
              if(creep.withdraw(closestContainer, RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
                creep.moveTo(closestContainer, {visualizePathStyle: {stroke: '#ffaa00'}});
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
      if(Game.spawns['Pink'].spawnCreep([WORK, WORK, CARRY, CARRY, MOVE, MOVE], 'Upgrader' + Math.floor(Math.random() * 100),
        {memory: {
          role: 'upgrader'
        }}) == 0) {
            console.log("Spawning Upgrader..");
      }
    }
};

module.exports = roleUpgrader;
