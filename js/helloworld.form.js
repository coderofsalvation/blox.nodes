var script = `this.onAction = (action,param) => {
	alert("hello","incoming data: "+JSON.stringify(this.data))
	.then( ()  => prompt("my form","description",{ type:"string", title:"foo"}) )
	.then( (r) => notify("hello form: "+r) )
	.then( ()  => console.log("hello incoming data:"+this.data) )
	.then( ()  => this.trigger(null,{foo:'bar'}) )
}`

function helloWorldForm(Form){
    
    var f = Form({
        path:"examples/helloworld-form",
        title:"Javascript",
        allowEmptyTitle: false,
        description:"executes javascript",
        onInit: function(opts){
        	
			this.onContextMenu = () => [
 				{
					content:"Trigger", 
					callback: (menu,e,emouse,opts,node) => this.run()
				}
			]
		
			this.properties.schema = {
				type:"object", 
				properties:{
					foo: { type: "string" }
				}	
			}
				
		  	this.properties['$script'] = script.replace(/;$/gm,'')
       	  	
			this.onAction = (action,param) => {
				var formData = this.properties.data
				this.data = param
				this.run()
			}

			this.run = () => {
				lib.runScript( this.properties['$script']+";return this", this )
				.then( (f) => {
					if( f.onAction ) f.onAction(null,this.data)
				})
			}
        }
    })

    return f
}

LiteGraph.registerNodeType( "examples/helloworld-form", helloWorldForm(LiteGraph.Form))
