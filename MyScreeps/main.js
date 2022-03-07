var roleHarvester = require('role.harvester');
var roleUpgrader = require('role.upgrader');
var roleBuilder = require('role.builder');
var roleHarvesterBig = require('role.harvesterbig')
var roleupgraderBig = require('role.upgraderbig')
var rolebuilderBig = require('role.builderbig')
var roleRepairer = require('role.repairer')
var rolerepairerBig = require('role.repairerbig')
var roleGrunt = require('role.grunt')

module.exports.loop = function () {

  for(var name in Memory.creeps) {
    if(!Game.creeps[name]) {
      delete Memory.creeps[name];
      console.log('Clearing non-existing creep memory:', name);
    }
  }

  //number of creeps required
  const numberHarvester = 5
  const numberUpgrader = 5
  const numberBuilder = 3
  const numberRepairer = 3
  const numberGrunt = 5
  const numberHarvesterBig = 1
  const numberUpgraderBig = 3
  const numberBuilderBig = 1
  const numberRepairerBig = 3

  //Check how many of each creeps are active
  var harvesters = _.filter(Game.creeps, (creep) => creep.memory.role == 'harvester');
  console.log('Harvesters: ' + harvesters.length);

  var upgrader = _.filter(Game.creeps, (creep) => creep.memory.role == 'upgrader');
  console.log('Upgrader: ' + upgrader.length);

  var builder = _.filter(Game.creeps, (creep) => creep.memory.role == 'builder');
  console.log('Builder: ' + builder.length);

  var repairer = _.filter(Game.creeps, (creep) => creep.memory.role == 'repairer');
  console.log('repairer: ' + repairer.length);

  var grunt = _.filter(Game.creeps, (creep) => creep.memory.role == 'grunt');
  console.log('grunt: ' + grunt.length);

  var harvesterbig = _.filter(Game.creeps, (creep) => creep.memory.role == 'harvesterbig');
  console.log('HarvesterBig: ' + harvesterbig.length);

  var upgraderbig = _.filter(Game.creeps, (creep) => creep.memory.role == 'upgraderbig');
  console.log('upgraderBig: ' + upgraderbig.length);

  var builderbig = _.filter(Game.creeps, (creep) => creep.memory.role == 'builderbig');
  console.log('builderBig: ' + builderbig.length);

  var repairerbig = _.filter(Game.creeps, (creep) => creep.memory.role == 'repairerbig');
  console.log('repairerbig: ' + repairerbig.length);

  //if statments checking number of creeps in roles, then passes the argument to function

  if(harvesters.length < numberHarvester){
    spawnHarvester()
  }

  if(upgrader.length < numberUpgrader && harvesters.length >= numberHarvester) {
    spawnUpgrader()
  }

  if(builder.length < numberBuilder && upgrader.length >= numberUpgrader &&
    harvesters.length >= numberHarvester) {
      spawnBuilder()
    }

    if(repairer.length < numberRepairer && upgrader.length >= numberUpgrader &&
      harvesters.length >= numberHarvester && builder.length >= numberBuilder) {
        spawnRepairer()
      }

      if(grunt.length < numberGrunt && harvesters.length >= numberHarvester &&
        upgrader.length >= numberUpgrader && builder.length >= numberBuilder && repairer.length >= numberRepairer){
          spawnGrunt()
        }

        if(harvesterbig.length < numberHarvesterBig && harvesters.length >= numberHarvester &&
          upgrader.length >= numberUpgrader && builder.length >= numberBuilder &&
          repairer.length >= numberRepairer && grunt.length >= numberGrunt){
            spawnHarvesterBig()
          }

          if(upgraderbig.length < numberUpgraderBig && harvesters.length >= numberHarvester &&
            upgrader.length >= numberUpgrader && builder.length >= numberBuilder &&
            harvesterbig.length >= numberHarvesterBig &&
            repairer.length >= numberRepairer && grunt.length >= numberGrunt){
              spawnupgraderBig()
            }

            if(builderbig.length < numberBuilderBig && harvesters.length >= numberHarvester &&
              upgrader.length >= numberUpgrader && builder.length >= numberBuilder &&
              harvesterbig.length >= numberHarvesterBig && upgraderbig.length >= numberUpgraderBig &&
              repairer.length >= numberRepairer && grunt.length >= numberGrunt){
                spawnbuilderBig()
              }

              if(repairerbig.length < numberRepairerBig && upgrader.length >= numberUpgrader &&
                harvesters.length >= numberHarvester && builder.length >= numberBuilder &&
                repairer.length >= numberRepairer && builderbig.length >= numberBuilderBig && upgraderbig.length >= numberUpgraderBig && grunt.length >= numberGrunt) {
                  spawnRepairerBig()
                }

                //Spawns new repairer when needed
                function spawnRepairer() {
                  var newName = 'repairer' + Game.time;
                  console.log('Spawning new repairer: ' + newName);
                  Game.spawns['RavenKing'].spawnCreep([WORK,CARRY,MOVE], newName,
                    {memory: {role: 'repairer'}});
                  }

                  if(Game.spawns['RavenKing'].spawning) {
                    var spawningCreep = Game.creeps[Game.spawns['RavenKing'].spawning.name];
                    Game.spawns['RavenKing'].room.visual.text(
                      '🚧' + spawningCreep.memory.role,
                      Game.spawns['RavenKing'].pos.x + 1,
                      Game.spawns['RavenKing'].pos.y,
                      {align: 'left', opacity: 0.8});
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

                                            // spawns new RepairerBig when needed
                                            function spawnRepairerBig() {
                                              var newName = 'RepairerBig' + Game.time;
                                              console.log('Spawning new repairerbig: ' + newName);
                                              Game.spawns['RavenKing'].spawnCreep([WORK,WORK,WORK,MOVE,MOVE,MOVE,CARRY,CARRY,CARRY], newName,
                                                {memory: {role: 'repairerbig'}});
                                              }

                                              if(Game.spawns['RavenKing'].spawning) {
                                                var spawningCreep = Game.creeps[Game.spawns['RavenKing'].spawning.name];
                                                Game.spawns['RavenKing'].room.visual.text(
                                                  '🛠️' + spawningCreep.memory.role,
                                                  Game.spawns['RavenKing'].pos.x + 1,
                                                  Game.spawns['RavenKing'].pos.y,
                                                  {align: 'left', opacity: 0.8});
                                                }

                                                // spawns new grunt when needed
                                                function spawnGrunt() {
                                                  var newName = 'grunt' + Game.time;
                                                  console.log('Spawning new grunt: ' + newName);
                                                  Game.spawns['RavenKing'].spawnCreep([WORK,WORK,MOVE,MOVE,CARRY,CARRY], newName,
                                                    {memory: {role: 'grunt'}});
                                                  }

                                                  if(Game.spawns['RavenKing'].spawning) {
                                                    var spawningCreep = Game.creeps[Game.spawns['RavenKing'].spawning.name];
                                                    Game.spawns['RavenKing'].room.visual.text(
                                                      '🛠️' + spawningCreep.memory.role,
                                                      Game.spawns['RavenKing'].pos.x + 1,
                                                      Game.spawns['RavenKing'].pos.y,
                                                      {align: 'left', opacity: 0.8});
                                                    }

                                                    //Tower, may need to change the ID
                                                    var tower = Game.getObjectById('621e5e72c98d807d6eac2268');
                                                    if(tower) {
                                                      var closestDamagedStructure = tower.pos.findClosestByRange(FIND_STRUCTURES, {
                                                        filter: (structure) => structure.hits < structure.hitsMax
                                                        && structure.structure !== STRUCTURE_WALL
                                                        || structure.structureType !== STRUCTURE_ROAD
                                                      });
                                                      if(closestDamagedStructure) {
                                                        tower.repair(closestDamagedStructure);
                                                      }

                                                      var closestHostile = tower.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
                                                      if(closestHostile) {
                                                        tower.attack(closestHostile);
                                                      }
                                                    }

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
                                                      if(creep.memory.role == 'repairer') {
                                                        roleRepairer.run(creep);
                                                      }
                                                      if(creep.memory.role == 'repairerbig') {
                                                        rolerepairerBig.run(creep);
                                                      }
                                                      if(creep.memory.role == 'grunt') {
                                                        roleGrunt.run(creep);
                                                      }
                                                    }
                                                  }
