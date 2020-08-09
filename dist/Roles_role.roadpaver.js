let roleRoadpaver = {

    /** @param {Creep} creep **/
    run:function(creep){


        //console.log(roadSites);

        if(!creep.memory.mining) {
            if(creep.store.getUsedCapacity() == 0){
                creep.memory.mining = true;
            }
            let roadSites = creep.room.find(FIND_MY_CONSTRUCTION_SITES, {filter:{structureType: STRUCTURE_ROAD}});
            let closestSite = creep.pos.findClosestByPath(roadSites);
           // console.log(creep.build(closestSite));
            if (creep.pos.getRangeTo(closestSite) >= 0) {
                creep.moveTo(closestSite, {visualizePathStyle: {stroke: 'red'}});
                if(creep.pos.getRangeTo(closestSite) == 0) {
                    creep.build(closestSite) == ERR_NOT_IN_RANGE;
                }
            }
        }
        else if(creep.memory.mining) {
            if(creep.store.getFreeCapacity() == 0) {
                creep.memory.mining = false;
                creep.say(" Full!");
            }
            let source = creep.pos.findClosestByPath(FIND_SOURCES);
           //console.log(source);
            if (creep.harvest(source) == ERR_NOT_IN_RANGE) {
                creep.moveTo(source ,{visualizePathStyle: {stroke: '#ffaa00'}});
    //console.log(source);
            }
        }
    },
    spawn:function() {
      if(Game.spawns['Pink'].spawnCreep([WORK, WORK, CARRY, CARRY, MOVE, MOVE], 'RoadPaver' + Math.floor(Math.random() * 100), {
          memory: {
              role: 'roadpaver',
              mining: true
          }}) == 0){
            console.log("Spawning RoadPaver..");
          }
    }
}
module.exports = roleRoadpaver;
