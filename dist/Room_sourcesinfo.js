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

/*
for(var roomName in Game.rooms){//Loop through all rooms your creeps/structures are in
    var room = Game.rooms[roomName];
    if(!room.memory.sources){//If this room has no sources memory yet
        room.memory.sources = {}; //Add it
        var sources = room.find(FIND_SOURCES);//Find all sources in the current room
        for(var i in sources){
            var source = sources[i];
            source.memory = room.memory.sources[source.id] = {}; //Create a new empty memory object for this source
            //Now you can do anything you want to do with this source
            //for example you could add a worker counter:
            source.memory.workers = 0;
        }
    }else{ //The memory already exists so lets add a shortcut to the sources its memory
        var sources = room.find(FIND_SOURCES);//Find all sources in the current room
        for(var i in sources){
            var source = sources[i];
            source.memory = this.memory.sources[source.id]; //Set the shortcut
        }
    }
}*/