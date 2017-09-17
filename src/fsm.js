class FSM {

    constructor(config) {
        this.config = config;
        this.config.state = this.config.initial;
        this.config.prevstate = [];
        this.config.count = 0;
        this.config.undocount = 0;
        this.triggercount = 0;
        this.changestatecount = 0;
}

    getState() {
        return this.config.state;


    }

    changeState(state) {
        if(state in this.config.states){
        this.config.prevstate[this.config.count] = this.config.state;
        this.config.count = +this.config.count + 1;
        this.config.state = state;
        this.changestatecount ++;


    }
    else error(function() {
    });

    }

    trigger(event) {
    var key = this.config.state;
        if(this.config.states[key].transitions[event]){
            this.config.prevstate[this.config.count] = this.config.state;
            this.config.count = +this.config.count + 1;
            this.config.state =  this.config.states[key].transitions[event];
            this.triggercount++;
        }
        else error(function() {

        });

    

    }

    reset() {
        this.config.state = this.config.initial;

    }

    getStates(event) {
        var array = [];
        var i = 0;
        if(event == null){
        for(var key in this.config.states){
            array[i] = key;
            i++;
        }
        return array;
    }

    for(var key in this.config.states){
        if(this.config.states[key].transitions[event]){
         array[i] = key;
        i++;   
        }

    }
     return array;   
    }

    undo() {
        if(!this.config.prevstate[0] ){
            return false;
        }
        if(this.config.count < 1){
            return false;
        }
        if ( this.config.count >= 1 ){
        this.config.prevstate[this.config.count] = this.config.state;   
        this.config.count = +this.config.count - 1;
        this.config.state = this.config.prevstate[this.config.count];
        this.config.undocount = +this.config.undocount + 1;
        this.triggercount = 0;
        this.changestatecount = 0;
        return true;
    }

    }

    /**
     * Goes redo to state.
     * Returns false if redo is not available.
     * @returns {Boolean}
     */
    redo() {
        if(!this.config.prevstate[0]  || this.config.undocount < 1 || 
            this.triggercount > 0 || this.changestatecount > 0 ){
            return false;
        }
        this.config.count = (+this.config.count + 1 ) ;
        this.config.state = this.config.prevstate[this.config.count];
        this.config.undocount = +this.config.undocount - 1;
        this.triggercount = 0;
        this.changestatecount = 0;
        
        return true;
    
    }

    /**
     * Clears transition history
     */
    clearHistory() {
        this.config.prevstate = [];
        this.config.count = 0;
    }

}


module.exports = FSM;

/** @Created by Uladzimir Halushka **/
