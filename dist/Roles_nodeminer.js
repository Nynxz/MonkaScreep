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
            //console.log(creep.harvest(sourceObject));
            if(creep.harvest(sourceObject) == ERR_NOT_IN_RANGE){ //IF CREEP CANNOT MINE
                creep.moveTo(sourceObject); //MOVE TOWARDS SOURCE
            }

        //IF Creep is FULL
        } else {
            //FIND CLOSEST CONTAINER to CREEP
            //console.log(creep.pos.findClosestByRange(FIND_STRUCTURES, {filter: (structure) => structure.structureType == STRUCTURE_CONTAINER && structure.store.getFreeCapacity != 0}));
            let container = creep.pos.findClosestByRange(FIND_STRUCTURES, {filter: (structure) => structure.structureType == STRUCTURE_CONTAINER && structure.store.getFreeCapacity != 0});
            //TRANSFER(deposit) ENERGY into CONTAINER
            if(creep.transfer(container, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE){
                creep.moveTo(container);
            }
        }
    },

    containerInfo:function() {
        
    },


    spawn:function() {
        console.log("Trying to spawn Node Miner[4W 1C 1M]");
      if(Game.spawns['Pink'].spawnCreep([WORK, WORK, WORK, WORK, CARRY, MOVE], 'NodeMiner' + Game.spawns['Pink'].memory.creepCount.NodeMiner,
      {memory:{
        role: 'nodeminer',
        mining: true,
        containerID: 0,
        attached: false,
        nodeID: 0

      }}) == 0){
            Game.spawns['Pink'].memory.creepCount.NodeMiner += 1;
            console.log("Spawning Node Miner..");
      } else {
          return "Not Enough Energy";
      }
    }

}

module.exports = roleNodeMiner;