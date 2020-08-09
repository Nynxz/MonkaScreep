let roles = require('creepRoles');

//let memoryCleanupCreep = () => {}

global.memoryCleanupCreep = function() {
  for(let name in Memory.creeps){
      if(!Game.creeps[name]){
          delete Memory.creeps[name];
          //console.log('Removing ' + name + " from memory.");
      }
  }
}

let spawnVisitor = () => {
    roles.Visitor.spawn();
    return true;
}

let spawnHarvester = () => {
  return roles.Harvester.spawn();
}

let spawnLogistics = () => {
  return roles.Logistics.spawn();
}

let spawnNodeMiner = () => {
  console.log("Trying to spawn Node Miner..");
  roles.NodeMiner.spawn();
}

this.helpers = {
  memoryCleanupCreep,
  spawnVisitor,
  spawnHarvester,
  spawnLogistics,
  spawnNodeMiner
}
