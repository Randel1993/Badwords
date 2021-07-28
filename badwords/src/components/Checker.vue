<template>
  <div class="checker">
   <table class="table table-striped">
      <thead>
        <tr>
          <td>Sentence</td>
          <td>Profanity %</td>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(p, index) in tweets" :key="index">
          <td>{{p.sentence}}</td>
          <td>{{p.profanity}}</td>
        </tr>
      </tbody>
    </table>
    <label class="text-reader">
      Read File
      <input type="file" accept='.txt' @change="loadTextFromFile">
  </label>
  </div>
  </div>
</template>

<script>

var Filter = require('bad-words'),
    filter = new Filter();


export default {
  name: 'Checker',
  data () {
    return {
      tweets: [],
    }
  },
  methods: {
    loadTextFromFile(ev) {
      const _this = this;
      const file = ev.target.files[0];
      const reader = new FileReader();

      reader.onload = function () {
        var lines = this.result.split('\r\n');
        _this.tweets = [];

        for(const line of lines) {
          _this.tweets.push({sentence: line, profanity: _this.computeSentence(line)});
        }

      }

      reader.onloadend = function () {
        _this.text = reader.result;
      }
      reader.readAsText(file);
    },

    computeSentence(tweet) {
      var words = tweet.split(" ");
      var max = words.length;
      var total = 0;
      for(const word of words){
        if(filter.isProfane(word)) {
          total++;
        }
      }

      return ((total/max)*100) + '%';

    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
h1, h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #35495E;
}

.text-reader {
  position: relative;
  overflow: hidden;
  display: inline-block;

  border: 2px solid black;
  border-radius: 5px;
  padding: 8px 12px;
  cursor: pointer;
}
.text-reader input {
  position: absolute;
  top: 0;
  left: 0;
  z-index: -1;
  opacity: 0;
}
</style>
