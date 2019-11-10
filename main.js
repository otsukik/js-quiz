const DATA_URL = 'https://opentdb.com/api.php?amount=10&type=multiple';

const quiz = new Quiz();

const quizIndex = document.getElementById('quiz-index');
const category = document.getElementById('category');
const difficulty = document.getElementById('difficulty');
const question = document.getElementById('question');
const startBtn = document.getElementById('start-btn');
const answerList = document.getElementById('answer-list');


const startQuiz = async quizInstance => {
  quizIndex.textContent = '取得中';
  question.textContent = '少々お待ち下さい';
  startBtn.parentNode.removeChild(startBtn);

  await quizInstance.fetchData(DATA_URL);
  displayQuiz(quiz);
}

const displayQuiz = quizInstance => {
  quizIndex.textContent = `問題${quizInstance.index + 1}`;
  category.textContent = `[ジャンル]${quizInstance.getCategory(quizInstance.index)}`;
  difficulty.textContent = `[難易度]${quizInstance.getDifficulty(quizInstance.index)}`;
  question.textContent = unescapedHTML(quizInstance.getQuestion(quizInstance.index));

  // シャッフルした解答一覧を代入
  const shuffledAnswers = quizInstance.shuffleCurrentAnswers(quizInstance.index);

  // 解答一覧を作成表示
  shuffledAnswers.forEach(answer => {
    const li = document.createElement('li');
    const btn = document.createElement('button');
    btn.textContent = unescapedHTML(answer);
    li.appendChild(btn);
    answerList.appendChild(li);
    
    // 解答を押した時の処理
    btn.addEventListener('click', () => {
      if (btn.textContent === quizInstance.getAnswer(quizInstance.index)) {
        quizInstance.addScore();
      }
      
      quizInstance.addIndex();
      setNextQuiz(quiz);
    });
  });
}

const setNextQuiz = quizInstance => {
  quizIndex.textContent = '';
  category.textContent = '';
  difficulty.textContent = '';
  question.textContent = '';

  while (answerList.firstChild) {
    answerList.removeChild(answerList.firstChild);
  }

  if (quizInstance.index < quizInstance.quizzesLength) {
    displayQuiz(quizInstance);
  } else {
    finishQuiz(quiz);
  }
}

const finishQuiz = quizInstance => {
  quizIndex.textContent = `あなたの正答数は${quizInstance.score}です！！`
  question.textContent = '再度チャレンジしたい場合は以下をクリック！！'

  const li = document.createElement('li');
  const btn = document.createElement('button');
  btn.textContent = 'ホームに戻る';
  li.appendChild(btn);
  answerList.appendChild(li);

  // ホームに戻るボタンを押した時の処理
  btn.addEventListener('click', () => {
    location.reload();
  });
}

// エスケープされた文字（文字実体参照）をアンエスケープする（実際の文字に戻す）関数
const unescapedHTML = escapedHtml => {
  const doc = new DOMParser().parseFromString(escapedHtml, 'text/html');
  return doc.documentElement.textContent;
}

// 開始ボタンを押した時の処理
startBtn.addEventListener('click', () => {
  startQuiz(quiz);
});