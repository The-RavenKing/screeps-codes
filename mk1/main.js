var roleHarvester = require('role.harvester');
var roleUpgrader = require('role.upgrader');
var roleBuilder = require('role.builder');
var roleHarvesterBig = require('role.harvesterbig')
var roleupgraderBig = require('role.upgraderbig')
var rolebuilderBig = require('role.builderbig')

module.exports.loop = function () {

    for(var name in Memory.creeps) {
        if(!Game.creeps[name]) {
            delete Memory.creeps[name];
            console.log('Clearing non-existing creep memory:', name);
        }
    }

//Check how many of each creeps are active
    var harvesters = _.filter(Game.creeps, (creep) => creep.memory.role == 'harvester');
    console.log('Harvesters: ' + harvesters.length);

    var upgrader = _.filter(Game.creeps, (creep) => creep.memory.role == 'upgrader');
    console.log('Upgrader: ' + upgrader.length);

    var builder = _.filter(Game.creeps, (creep) => creep.memory.role == 'builder');
    console.log('Builder: ' + builder.length);

    var harvesterbig = _.filter(Game.creeps, (creep) => creep.memory.role == 'harvesterbig');
    console.log('HarvesterBig: ' + harvesterbig.length);

    var upgraderbig = _.filter(Game.creeps, (creep) => creep.memory.role == 'upgraderbig');
    console.log('upgraderBig: ' + upgraderbig.length);

    var builderbig = _.filter(Game.creeps, (creep) => creep.memory.role == 'builderbig');
    console.log('builderBig: ' + builderbig.length);

//number of creeps required
  const numberHarvester = 3
  const numberUpgrader = 3
  const numberBuilder = 3
  const numberHarvesterBig = 1
  const numberUpgraderBig = 1
  const numberBuilderBig = 1


//if statments checking number of creeps in roles, then passes the argument to function
    if(builder.length < numberBuilder && upgrader.length >= numberUpgrader && harvesters.length >= numberHarvester) {
      spawnBuilder()
    }
    if(upgrader.length < numberUpgrader && harvesters.length >= numberHarvester) {
      spawnUpgrader()
    }
    if(harvesters.length < numberHarvester){
      spawnHarvester()
    }
    if(harvesterbig.length < numberHarvesterBig && harvesters.length >= numberHarvester && upgrader.length >= numberUpgrader && builder.length >= numberBuilder){
      spawnHarvesterBig()
    }
    if(upgraderbig.length < numberHarvesterBig && harvesters.length >= numberHarvester &&
      upgrader.length >= numberUpgrader && builder.length >= numberBuilder &&
      harvesterbig.length >= numberHarvesterBig){
      spawnupgraderBig()
    }
    if(builderbig.length < numberBuilderBig && harvesters.length >= numberHarvester &&
      upgrader.length >= numberUpgrader && builder.length >= numberBuilder &&
      harvesterbig.length >= numberHarvesterBig && upgraderbig.length >= numberUpgraderBig){
      spawnbuilderBig()
    }

  //spawns new harvesters when needed
      function spawnHarvester() {
          var newName = 'Harvester' + Game.time;
          console.log('Spawning new harvester: ' + newName);
          Game.spawns['RavenKing'].spawnCreep([WORK,CARRY,MOVE], newName,
              {memory: {role: 'harvester', targetSourceId: '5bbcb09d9099fc012e63c6f3'}});
      }

      if(Game.spawns['RavenKing'].spawning) {
          var spawningCreep = Game.creeps[Game.spawns['RavenKing'].spawning.name];
          Game.spawns['RavenKing'].room.visual.text(
              '🛠️' + spawningCreep.memory.role,
              Game.spawns['RavenKing'].pos.x + 1,
              Game.spawns['RavenKing'].pos.y,
              {align: 'left', opacity: 0.8});
      }

//Spawns new builders when needed

  function spawnBuilder() {
      var newName = 'builder' + Game.time;
      console.log('Spawning new builder: ' + newName);
      Game.spawns['RavenKing'].spawnCreep([WORK,CARRY,MOVE], newName,
          {memory: {role: 'builder'}});
      }

      if(Game.spawns['RavenKing'].spawning) {
          var spawningCreep = Game.creeps[Game.spawns['RavenKing'].spawning.name];
          Game.spawns['RavenKing'].room.visual.text(
              '🚧' + spawningCreep.memory.role,
              Game.spawns['RavenKing'].pos.x + 1,
              Game.spawns['RavenKing'].pos.y,
              {align: 'left', opacity: 0.8});
      }

  //Spawns new upgraders when needed

    function spawnUpgrader() {
        var newName = 'upgrader' + Game.time;
        console.log('Spawning new upgrader: ' + newName);
        Game.spawns['RavenKing'].spawnCreep([WORK,CARRY,MOVE], newName,
            {memory: {role: 'upgrader'}});
      }

        if(Game.spawns['RavenKing'].spawning) {
            var spawningCreep = Game.creeps[Game.spawns['RavenKing'].spawning.name];
            Game.spawns['RavenKing'].room.visual.text(
                '⚡' + spawningCreep.memory.role,
                Game.spawns['RavenKing'].pos.x + 1,
                Game.spawns['RavenKing'].pos.y,
                {align: 'left', opacity: 0.8});
        }

// spawns new HarvesterBig when needed
    function spawnHarvesterBig() {
          var newName = 'HarvesterBig' + Game.time;
          console.log('Spawning new harvesterbig: ' + newName);
          Game.spawns['RavenKing'].spawnCreep([WORK,WORK,WORK,WORK,CARRY,MOVE,MOVE], newName,
              {memory: {role: 'harvesterbig'}});
      }

      if(Game.spawns['RavenKing'].spawning) {
          var spawningCreep = Game.creeps[Game.spawns['RavenKing'].spawning.name];
          Game.spawns['RavenKing'].room.visual.text(
              '🛠️' + spawningCreep.memory.role,
              Game.spawns['RavenKing'].pos.x + 1,
              Game.spawns['RavenKing'].pos.y,
              {align: 'left', opacity: 0.8});
      }



      // spawns new upgraderBig when needed
          function spawnupgraderBig() {
                var newName = 'upgraderBig' + Game.time;
                console.log('Spawning new upgraderBig: ' + newName);
                Game.spawns['RavenKing'].spawnCreep([WORK,WORK,CARRY,MOVE,MOVE,MOVE,MOVE], newName,
                    {memory: {role: 'upgraderbig'}});
      }

      if(Game.spawns['RavenKing'].spawning) {
          var spawningCreep = Game.creeps[Game.spawns['RavenKing'].spawning.name];
          Game.spawns['RavenKing'].room.visual.text(
              '⚡' + spawningCreep.memory.role,
              Game.spawns['RavenKing'].pos.x + 1,
              Game.spawns['RavenKing'].pos.y,
              {align: 'left', opacity: 0.8});
      }

      // spawns new builderBig when needed
          function spawnbuilderBig() {
                var newName = 'builderBig' + Game.time;
                console.log('Spawning new builderbig: ' + newName);
                Game.spawns['RavenKing'].spawnCreep([WORK,WORK,WORK,WORK,CARRY,MOVE,MOVE], newName,
                    {memory: {role: 'builderbig'}});
      }

      if(Game.spawns['RavenKing'].spawning) {
          var spawningCreep = Game.creeps[Game.spawns['RavenKing'].spawning.name];
          Game.spawns['RavenKing'].room.visual.text(
              '🚧' + spawningCreep.memory.role,
              Game.spawns['RavenKing'].pos.x + 1,
              Game.spawns['RavenKing'].pos.y,
              {align: 'left', opacity: 0.8});
      }

//Tower, may need to change the ID
// var tower = Game.getObjectById('6a11c17e01bffde4dd60286a');
// if(tower) {
//     var closestDamagedStructure = tower.pos.findClosestByRange(FIND_STRUCTURES, {
//         filter: (structure) => structure.hits < structure.hitsMax
//     });
//     if(closestDamagedStructure) {
//         tower.repair(closestDamagedStructure);
//     }
//
//     var closestHostile = tower.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
//     if(closestHostile) {
//         tower.attack(closestHostile);
//     }
// }

//loop for roles to run
    for(var name in Game.creeps) {
        var creep = Game.creeps[name];
        if(creep.memory.role == 'harvester') {
            roleHarvester.run(creep);
        }
        if(creep.memory.role == 'upgrader') {
            roleUpgrader.run(creep);
        }
        if(creep.memory.role == 'builder') {
            roleBuilder.run(creep);
        }
         if(creep.memory.role == 'harvesterbig') {
            roleHarvesterBig.run(creep);
        }
         if(creep.memory.role == 'upgraderbig') {
            roleupgraderBig.run(creep);
        }
         if(creep.memory.role == 'builderbig') {
            rolebuilderBig.run(creep);
        }
    }
}
