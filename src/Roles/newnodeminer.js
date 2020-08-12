let NodeMiner = {

    /** @param {StructureSpawn} spawner, @param int level  */
    spawn:function(spawner, level){
        let creepCount = Game.spawns[spawner].memory.creepCount.NodeMiner;
        let creepBody;

        switch (level) {
            case 1:
                creepBody = [WORK,WORK,CARRY,MOVE];
                break;
            case 2:
                creepBody = [WORK,WORK,WORK,WORK,CARRY,MOVE];
                break;
            default:
                creepBody = [WORK, CARRY, MOVE];
                break;
        }
        
        console.log('Trying to spawn a NodeMiner[LEVEL ' + level + ']: ' + creepBody);
        if(Game.spawns[spawner].spawnCreep(creepBody, 'NodeMiner' + creepCount, {memory:{
            role: 'nodeminer',
            working: false,
            containerID: 0,
            nodeID: 0,
            attached: false
        }}) == 0){
            Game.spawn[spawner].memory.creepCount.NodeMiner += 1;
            console.log('Spawning NodeMiner'+creepCount);
        }
    },

    
    /** @param {Creep} creep Creep 
     *  @param {Source} Node Target Source */
    attach:function(creep, Node){
        if(creep.memory.nodeID == 0 && Node.memory.currentNodeMinerID == 0){
            console.log('Attaching to Node in' + Node.room.name);
            creep.memory.nodeID = Node.id;
            Node.room.memory.currentNodeMinerID = creep.id;
        }
    },

    /** @param {Creep} creep Creep */
    move:function(creep){
        let x = creep.room.memory[creep.memory.sourceID].posX;
        let y = creep.room.memory[creep.memory.sourceID].posY;
        creep.moveTo(x, y);
    },

    /** @param {Creep} creep Creep */
    mine:function(creep){
        creep.harvest(Game.getObjectById(creep.memory.nodeID));
    },

    /** @param {Creep} creep Creep */
    run:function(creep){
        if(creep.memory.attached == false){
            NodeMiner.attach(creep, creep.pos.findClosestByRange(FIND_SOURCES, {filter: (source) => creep.room.memory.sources[source.id]. currentNodeMinerID == 0}));
            console.log('ATTACHING RUN');
        } else {
            NodeMiner.move(creep);
            console.log('Moving');
        }
    }

}
module.exports = NodeMiner;