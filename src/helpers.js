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

this.helpers = {
  memoryCleanupCreep,
  spawnVisitor,
  spawnHarvester
}
