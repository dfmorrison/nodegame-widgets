(function (node) {
	
	node.widgets.register('VisualState', VisualState);
	
	var GameState = node.GameState,
		JSUS = node.JSUS,
		Table = node.window.Table;
	
// ## Defaults
	
	VisualState.defaults = {};
	VisualState.defaults.id = 'visualstate';
	VisualState.defaults.fieldset = { 
		legend: 'State',
		id: 'visualstate_fieldset',
	};	
	
// ## Meta-data
	
	VisualState.name = 'Visual State';
	VisualState.version = '0.2.1';
	VisualState.description = 'Visually display current, previous and next state of the game.';
	
// ## Dependencies
	
	VisualState.dependencies = {
		JSUS: {},
		Table: {}
	};
	
	
	function VisualState (options) {
		this.id = options.id;
		this.gameLoop = node.game.gameLoop;
		
		this.root = null;		// the parent element
		this.table = new Table();
	}
	
	VisualState.prototype.getRoot = function () {
		return this.root;
	};
	
	VisualState.prototype.append = function (root, ids) {
		var that = this;
		var PREF = this.id + '_';
		root.appendChild(this.table.table);
		this.writeState();
		return root;
	};
		
	VisualState.prototype.listeners = function () {
		var that = this;
		node.on('STATECHANGE', function() {
			that.writeState();
		}); 
	};
	
	VisualState.prototype.writeState = function () {
		var state = false;
		var pr = false;
		var nx = false;
		
		var miss = '-';
		
		if (node.game && node.game.state) {
			state = this.gameLoop.getName(node.game.state) || miss;
			pr = this.gameLoop.getName(node.game.previous()) || miss;
			nx = this.gameLoop.getName(node.game.next()) || miss;
		}
		else {
			state = 'Uninitialized';
			pr = miss;
			nx = miss;
		}
		this.table.clear(true);

		this.table.addRow(['Previous: ', pr]);
		this.table.addRow(['Current: ', state]);
		this.table.addRow(['Next: ', nx]);
	
		var t = this.table.select('y', '=', 2);
		t.addClass('strong');
		t.select('x','=',0).addClass('underline');
		this.table.parse();
	};
	
})(node);