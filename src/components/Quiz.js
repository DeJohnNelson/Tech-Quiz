var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
import { useState, } from 'react';
import { getQuestions } from '../services/questionApi.js';
var Quiz = function () {
    var _a = useState([]), questions = _a[0], setQuestions = _a[1];
    var _b = useState(0), currentQuestionIndex = _b[0], setCurrentQuestionIndex = _b[1];
    var _c = useState(0), score = _c[0], setScore = _c[1];
    var _d = useState(false), quizCompleted = _d[0], setQuizCompleted = _d[1];
    var _e = useState(false), quizStarted = _e[0], setQuizStarted = _e[1];
    var getRandomQuestions = function () { return __awaiter(void 0, void 0, void 0, function () {
        var questions_1, err_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, getQuestions()];
                case 1:
                    questions_1 = _a.sent();
                    if (!questions_1) {
                        throw new Error('something went wrong!');
                    }
                    setQuestions(questions_1);
                    return [3 /*break*/, 3];
                case 2:
                    err_1 = _a.sent();
                    console.error(err_1);
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    }); };
    var handleAnswerClick = function (isCorrect) {
        if (isCorrect) {
            setScore(score + 1);
        }
        var nextQuestionIndex = currentQuestionIndex + 1;
        if (nextQuestionIndex < questions.length) {
            setCurrentQuestionIndex(nextQuestionIndex);
        }
        else {
            setQuizCompleted(true);
        }
    };
    var handleStartQuiz = function () { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, getRandomQuestions()];
                case 1:
                    _a.sent();
                    setQuizStarted(true);
                    setQuizCompleted(false);
                    setScore(0);
                    setCurrentQuestionIndex(0);
                    return [2 /*return*/];
            }
        });
    }); };
    if (!quizStarted) {
        return (<div className="p-4 text-center">
        <button className="btn btn-primary d-inline-block mx-auto" onClick={handleStartQuiz}>
          Start Quiz
        </button>
      </div>);
    }
    if (quizCompleted) {
        return (<div className="card p-4 text-center">
        <h2>Quiz Completed</h2>
        <div className="alert alert-success">
          Your score: {score}/{questions.length}
        </div>
        <button className="btn btn-primary d-inline-block mx-auto" onClick={handleStartQuiz}>
          Take New Quiz
        </button>
      </div>);
    }
    if (questions.length === 0) {
        return (<div className="d-flex justify-content-center align-items-center vh-100">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>);
    }
    var currentQuestion = questions[currentQuestionIndex];
    return (<div className='card p-4'>
      <h2>{currentQuestion.question}</h2>
      <div className="mt-3">
      {currentQuestion.answers.map(function (answer, index) { return (<div key={index} className="d-flex align-items-center mb-2">
          <button className="btn btn-primary" onClick={function () { return handleAnswerClick(answer.isCorrect); }}>{index + 1}</button>
          <div className="alert alert-secondary mb-0 ms-2 flex-grow-1">{answer.text}</div>
        </div>); })}
      </div>
    </div>);
};
export default Quiz;
