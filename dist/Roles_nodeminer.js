let roleNodeMiner = {

    /** @param {Creep} creep **/
    run:function(creep) {

        //CHECK if FULL
        if(creep.store.getFreeCapacity() == 0){ creep.memory.mining = false; }
        //CHECK if EMPTY
        if(creep.store.getUsedCapacity() == 0){ creep.memory.mining = true;  }
        
        //ATTACHMENT TO NODE
        if(!creep.memory.attached && creep.ticksToLive > 10){           
            let roomName = creep.room.name;
            for(source in Memory.rooms[roomName].sources){
                if(Memory.rooms[roomName].sources[source].currentNodeMinerID == 0 && creep.ticksToLive > 10){
                    console.log(creep.name + " attached to Node:" + source);
                    Memory.rooms[roomName].sources[source].currentNodeMinerID = creep.id;
                    sourceObject = Game.getObjectById(source);
                    creep.memory.attached = true;
                    creep.memory.nodeID = source;
                    break;
                }
            }
        }
        //DETACHMENT FROM NODE
        if((creep.ticksToLive < 10 || creep.hits < 10 ) && creep.memory.attached){
            let roomName = creep.room.name;
            let sourceIDs = creep.room.memory.sources;
            for(source in sourceIDs){
                if(Memory.rooms[roomName].sources[source].currentNodeMinerID == creep.id){
                    console.log(creep.name + " detaching from Node:" + source);
                    Memory.rooms[roomName].sources[source].currentNodeMinerID = 0;
                    creep.memory.attached = false;
                    creep.memory.nodeID = 0;
                }
            }
        }
        //IF CREEP is NOT FULL
        if(creep.memory.mining){
            let sourceObject = Game.getObjectById(creep.memory.nodeID); //Translate attached nodeID to object
            if(creep.harvest(sourceObject) == ERR_NOT_IN_RANGE){ //IF CREEP CANNOT MINE
                creep.moveTo(sourceObject); //MOVE TOWARDS SOURCE
            }

        //IF Creep is FULL
        } else {
            //FIND CLOSEST CONTAINER to CREEP
            let container = creep.pos.findClosestByPath(FIND_STRUCTURES, {filter: (structure) => structure.structureType == STRUCTURE_CONTAINER && structure.store.getFreeCapacity != 0});
            //TRANSFER(deposit) ENERGY into CONTAINER
            creep.transfer(container, RESOURCE_ENERGY);
        }
    },


    spawn:function() {
      if(Game.spawns['Pink'].spawnCreep([WORK, WORK, WORK, WORK, CARRY, MOVE], 'NodeMinerR' +  Math.floor(Math.random() * 100),
      {memory:{
        role: 'nodeminer',
        mining: true,
        attached: false,
        nodeID: 0
      }}) == 0){
          console.log("Spawning NodeMiner..");
      } else {
          return "Not Enough Energy";
      }
    }

}

module.exports = roleNodeMiner;