let sourcesInfo = {

    roomStats:function () {
        for(roomName in Game.rooms){//FOR ALL ROOMS OCCUPIED
            //console.log(roomName);
            let room = Game.rooms[roomName];
            //console.log(room);
           // console.log(JSON.stringify(room.memory.sources));
            if(!room.memory.sources){
                room.memory.sources = {};
                let sources = room.find(FIND_SOURCES);
                for(i in sources){
                    let source = sources[i];
                    source.memory = room.memory.sources[source.id] = {
                        currentNodeMinerID: 0,
                    };
                }
                let containerClosestToController = room.controller.pos.findClosestByPath(FIND_STRUCTURES, {filter: (structure) => structure.structureType == STRUCTURE_CONTAINER});
                room.memory.containerClosestToControllerID = containerClosestToController.id;
                //console.log(room.memory.containerClosestToControllerID);
            }
        }
    }
}

module.exports = sourcesInfo;