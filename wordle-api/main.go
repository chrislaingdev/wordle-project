package main

import (
	"encoding/csv"
	"fmt"
	"io"
	"math/rand"
	"net/http"
	"os"
	"strings"

	"github.com/gin-gonic/gin"
)

const LinesInAnswers = 2309
const LinesInGuesses = 10666

func readLine(filename string, lineNumber int) ([]string, error) {
	file, err := os.Open(filename)
	if err != nil {
		return nil, err
	}
	defer file.Close()

	reader := csv.NewReader(file)

	for i := 0; i < lineNumber; i++ {
		_, err := reader.Read()
		if err != nil {
			return nil, err
		}
	}
	record, err := reader.Read()
	if err != nil {
		return nil, err
	}

	return record, nil
}

func searchForWord(filename string, linesInFile int, searchFor string) (bool, error) {
	file, err := os.Open(filename)
	if err != nil {
		return false, err
	}
	defer file.Close()

	reader := csv.NewReader(file)

	for i := 0; i < linesInFile; i++ {
		n, err := reader.Read()
		if err == io.EOF {
			return false, err
		}
		if err != nil {
			return false, err
		}
		if i > 0 {
			word := strings.Join(n, "")
			if searchFor == word {
				return true, err
			}

		}

	}

	return false, err
}

func isValidGuess(word string) (bool, error) {
	result, err := searchForWord("database/valid_answers.csv", LinesInAnswers, word)
	if err != nil {
		fmt.Println(err)
	}
	if result {
		return result, err
	}
	result, err = searchForWord("database/valid_guesses.csv", LinesInGuesses, word)
	if err != nil {
		fmt.Println(err)
	}
	return result, err
}

func getWord(c *gin.Context) {
	word, err := readLine("database/valid_answers.csv", rand.Intn(LinesInAnswers)+1)
	if err != nil {
		c.IndentedJSON(http.StatusInternalServerError, err)
	}

	c.IndentedJSON(http.StatusOK, word)
}

func checkGuess(c *gin.Context) {
	guess := c.DefaultQuery("input", "")
	answer, err := isValidGuess(guess)
	if err != nil {
		c.IndentedJSON(http.StatusInternalServerError, err)
	}
	c.IndentedJSON(http.StatusOK, answer)
}

func main() {
	router := gin.Default()
	router.GET("/word", getWord)
	router.GET("/guess", checkGuess)
	router.Run("localhost:8080")
}
