// Copyright (C) 2024 Akave
// See LICENSE for copying information.

package encryption

import (
	"fmt"
	"io"

	chunk "github.com/ipfs/boxo/chunker"
)

// Splitter is a splitter that encrypts the data before splitting it.
// It's not valid to use the same splitter for multiple files.
type Splitter struct {
	chunk.Splitter

	key     []byte
	counter uint64 // is not valid if error happened during encryption
}

// NewSplitter creates a new EncryptedSplitter with the given key.
func NewSplitter(key []byte, reader io.Reader, blockSize int64) (*Splitter, error) {
	return &Splitter{
		Splitter: chunk.NewSizeSplitter(io.NopCloser(reader), blockSize),
		key:      key,
		counter:  0,
	}, nil
}

// NextBytes is ovveriden version of splitter.NextBytes().
func (s *Splitter) NextBytes() ([]byte, error) {
	data, err := s.Splitter.NextBytes()
	if err != nil {
		return nil, err
	}

	infoString := fmt.Sprintf("block_%d", s.counter)
	info := []byte(infoString)
	encrypted, err := Encrypt(s.key, data, info)
	if err != nil {
		return nil, err
	}

	s.counter++

	return encrypted, nil
}
