let roleDecaystop = {

    /** @param {Creep} creep **/
    run: function (creep) {

        let tofix = creep.room.find(FIND_STRUCTURES,
            {
                filter: (structure) =>
                    ((structure.structureType == STRUCTURE_SPAWN ||
                    structure.structureType == STRUCTURE_EXTENSION ||
                    structure.structureType == STRUCTURE_ROAD ||
                    structure.structureType == STRUCTURE_CONTAINER ||
                    structure.structureType == STRUCTURE_RAMPART)
                    &&
                    structure.hits < structure.hitsMax)
            });

        // tofix.sort((a,b) => a.hits - b.hits);

        //console.log('to fix' + tofix);
        if (creep.store.getUsedCapacity() == 0) {
                creep.memory.mining = true;
        } else if (creep.store.getFreeCapacity() == 0) {
                creep.memory.mining = false;
        }
        if (creep.memory.mining) {
            let sources = creep.room.find(FIND_SOURCES);
            //console.log(sources);
            if (creep.harvest(sources[1]) == ERR_NOT_IN_RANGE) {
                creep.moveTo(sources[1], {visualizePathStyle: {stroke: '#ffaa00'}});
                if (creep.store.getFreeCapacity() == 0) {
                    creep.memory.mining = false;
                }
            }
        } else if (!creep.memory.mining) {
            //console.log(tofix);
            if (creep.repair(tofix[0]) == ERR_NOT_IN_RANGE){
                creep.moveTo(tofix[0], {visualizePathStyle: {stroke: 'blue'}});
            }
            if (creep.store.getUsedCapacity() == 0) {
                creep.memory.mining = true;
            }
        }
    },
    spawn:function() {
      if(Game.spawns['Pink'].spawnCreep([WORK, WORK, CARRY, CARRY, MOVE, MOVE], 'DecayStopper' + Math.floor(Math.random() * 100), {
          memory: {
            role: 'decaystop',
            mining: true
        }}) == 0) {
          console.log('Spawning DecayStopper..');
        }
      }
}
module.exports = roleDecaystop;
/*          let energyStorages = creep.room.find(FIND_MY_STRUCTURES, {
filter: (structure) => {
    return ((
        structure.structureType == STRUCTURE_SPAWN ||
        structure.structureType == STRUCTURE_EXTENSION) &&
        (structure.energy < structure.energyCapacity))}}); */
