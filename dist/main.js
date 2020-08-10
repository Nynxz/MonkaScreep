let roles = require('creepRoles');
let utils = require('helpers');
let info = require('Room_sourcesinfo');
/*  CONTROLS  */

let  statusLog = 0, spawning = 0;

module.exports.loop = function () {
  memoryCleanupCreep();
  info.roomStats();

//Role Functionss
    let currentHarvesters = 0;
    let currentUpgraders = 0;
    let currentBuilders = 0;
    let currentDecayStop = 0;
    let currentRoadpavers = 0;
    let currentRampartMaintainers = 0;
    let currentVisitors = 0;
    let currentLogistics = 0;
    let currentNodeMiners = 0;

    for(var name in Game.creeps) {
        var creep = Game.creeps[name];
        if(creep.memory.role == 'harvester') {
            roles.Harvester.run(creep);
            currentHarvesters++;
        }
        if(creep.memory.role == 'upgrader') {
            roles.Upgrader.run(creep);
            currentUpgraders++;
        }
        if(creep.memory.role == 'builder') {
            roles.Builder.run(creep);
            currentBuilders++;
        }
        if(creep.memory.role == 'decaystop'){
            roles.DecayStopper.run(creep);
            currentDecayStop++;
        }
        if(creep.memory.role == 'roadpaver'){
            roles.RoadPaver.run(creep);
            currentRoadpavers++;
        }
        if(creep.memory.role == 'rampartmaintainer'){
          roles.RampartMaintainer.run(creep);
          currentRampartMaintainers++
        }
        if(creep.memory.role == 'visitor') {
          roles.Visitor.run(creep);
          currentVisitors++;
        }
        if(creep.memory.role == 'logistics') {
          roles.Logistics.run(creep);
          currentLogistics++;
        }
        if(creep.memory.role == 'nodeminer'){
          roles.NodeMiner.run(creep);
          currentNodeMiners++;
        }
    }

    if(spawning) {
      if (currentHarvesters < 0) {
        roles.Harvester.spawn();
      }
      if (currentRampartMaintainers < 0) {
        roles.RampartMaintainer.spawn();
      }
      if (currentBuilders < 0) {
        roles.Builder.spawn();
      }
      if (currentUpgraders < 0) {
        roles.Upgrader.spawn();
      }
      if (currentDecayStop < 0) {
        roles.DecayStopper.spawn();
      }
      if (currentRoadpavers < 0) {
        roles.RoadPaver.spawn();
      }
      if (currentVisitors < 0) {
        roles.Visitor.spawn();
      }
      if(currentLogistics < 0) {
        roles.Logistics.spawn();
      }
      if(currentNodeMiners <0){
        roles.NodeMiner.spawn();
      }
    }

    if(statusLog){
        console.log("Current Harvesters: " + currentHarvesters);
        console.log("Current Builders: " + currentBuilders);
        console.log("Current Upgraders: " + currentUpgraders);
        console.log("Current Decay Stoppers: " + currentDecayStop);
        console.log("Current Road Pavers: " + currentRoadpavers);
        console.log("Current Rampart Maintainers: " + currentRampartMaintainers);
        console.log("Current Visitors: " + currentVisitors);   
        console.log("Current Logistics: " + currentLogistics);
        console.log("Current Node Miners: " + currentNodeMiners);   
        
    }
}
//Game.spawns['Pink'].spawnCreep([WORK,WORK, CARRY, CARRY, MOVE, MOVE], 'RoadPaverDX', { memory: {role: 'roadpaver',mining: true}});
