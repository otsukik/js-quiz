class Quiz {
  constructor() {
    this._quizzes = [];
    this._index = 0;
    this._score = 0;
  }

  async fetchData(url) {
    try {
      const response = await fetch(url);
      if (response.ok) {
        const data = await response.json();
        this._quizzes = JSON.parse(JSON.stringify(data.results));
      }
    } catch (err) {
      alert(err);
      location.reload();
    }
  }

  // index番目の問題の解答一覧をシャッフルした配列を返す
  shuffleCurrentAnswers(index) {
    // incorrect_answersとcorrect_answerを結合
    const currentQuiz = JSON.parse(JSON.stringify(this._quizzes[index]));
    const answers = currentQuiz.incorrect_answers.slice();
    answers.push(currentQuiz.correct_answer);

    // シャッフルする処理
    for (let i = answers.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [answers[j], answers[i]] = [answers[i], answers[j]];
    }
    return answers;
  }

  addIndex() {
    this._index++;
  }

  addScore() {
    this._score++;
  }

  getIndex() {
    return this._index;
  }

  getScore() {
    return this._score;
  }

  getQuizzesLength() {
    return this._quizzes.length;
  }

  getCategory(index) {
    return this._quizzes[index].category;
  }

  getDifficulty(index) {
    return this._quizzes[index].difficulty;
  }

  getQuestion(index) {
    return this._quizzes[index].question;
  }

  getAnswer(index) {
    return this._quizzes[index].correct_answer;
  }
}