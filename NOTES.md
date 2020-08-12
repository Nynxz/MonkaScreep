#Roles

## Node Miner


### 1. Spawn -> Search Room Memory for Nodes

##### Creep
```
memory:{
        role: 'nodeminer',
        working: false,
        containerID: 0,
        attached: false,
        nodeID: 0
      }
```
##### Room
```
memory:{
    sources:{
        SOURCEID:{
            posX: X,
            posY: Y,
            currentNodeMinerID: 0
        }
    }
}
```

### 2. Attach -> Change Node & Creep Memory

##### Creep
```
memory:{
        role: 'nodeminer',
        working: false,
        containerID: 0,
        attached: true,     ++
        nodeID: SOURCEID    ++
      }
```
##### Room
```
memory:{
    sources:{
        SOURCEID:{
            posX: X,
            posY: Y,
            currentNodeMinerID: CREEPID     ++
        }
    }
}
```

### 3. Move -> Move to Node Position
### 4. Mine -> Mine to full capacity
### 5. Check -> Check for container
    - IF NO ATTACHED CONTAINER
        - CONSTRUCT CONTAINER
            - ATTACH CONTAINER_ID
    - IF ATTACHED CONTAINER
        - REPAIR CONTAINER
        - IF CONTAINER FULL REPAIRED
            - DEPOSIT ENERGY
