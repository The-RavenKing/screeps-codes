//spawns a basic creep called Harvester1
Game.spawns['Spawn1'].spawnCreep( [WORK, CARRY, MOVE], 'Harvester1' );

//spawns a creep "builder" and also adds that role to the memory at spawns
Game.spawns['RavenKing'].spawnCreep( [WORK, CARRY, MOVE], 'Builder1',
    { memory: { role: 'builder' } } );

//create my first spawns
Game.spawns['RavenKing'].spawnCreep( [WORK, CARRY, MOVE], 'Harvester1',
    { memory: { role: 'harvester' } } );

    //Create an Upgrader1
    Game.spawns['RavenKing'].spawnCreep( [WORK, CARRY, MOVE], 'Upgrader1',
        { memory: { role: 'upgrader' } } );

//calls and runs the roles role from main script module for harvester & upgrader
var roleHarvester = require('role.harvester');
var roleUpgrader = require('role.upgrader');

module.exports.loop = function () {

    for(var name in Game.creeps) {
        var creep = Game.creeps[name];
        if(creep.memory.role == 'harvester') {
            roleHarvester.run(creep);
        }
        if(creep.memory.role == 'upgrader') {
            roleUpgrader.run(creep);
        }
    }
}

//calls and runs roles for harvester & Builder
var roleHarvester = require('role.harvester');
var roleBuilder = require('role.builder');

module.exports.loop = function () {

    for(var name in Game.rooms) {
        console.log('Room "'+name+'" has '+Game.rooms[name].energyAvailable+' energy');
    }

    for(var name in Game.creeps) {
        var creep = Game.creeps[name];
        if(creep.memory.role == 'harvester') {
            roleHarvester.run(creep);
        }
        if(creep.memory.role == 'builder') {
            roleBuilder.run(creep);
        }
    }
}

//create upgrader
Game.spawns['Spawn1'].spawnCreep( [WORK, CARRY, MOVE], 'Upgrader1' );

//add role to creeps via console based on creep name
Game.creeps['Harvester1'].memory.role = 'harvester';
Game.creeps['Upgrader1'].memory.role = 'upgrader';


//spawns a larger creep with more body parts, this particular one needs 550 energy to spwan
Game.spawns['Spawn1'].spawnCreep( [WORK,WORK,WORK,WORK,CARRY,MOVE,MOVE],
    'HarvesterBig',
    { memory: { role: 'harvester' } } );

//safemode
Game.spawns['Spawn1'].room.controller.activateSafeMode();

//spawn a tower
Game.spawns['Spawn1'].room.createConstructionSite( 23, 22, STRUCTURE_TOWER );
