 <template>
        <div id="editor">
            <mavon-editor style="height: 100%" :placeholder='p'></mavon-editor>
        </div>
    </template>
    <script>
     
    export default {
        name: 'editor',
        
        data(){
        	return{
        		p:'start editing!',
        	}
        }
    }
    </script>
    <style>
    #editor {
        margin: auto;
        width: 80%;
        height: 580px;
    }
    </style>