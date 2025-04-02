// Copyright (C) 2024 Akave
// See LICENSE for copying information.

// Package cryptoutils provides a math/rand.Source that uses crypto/rand to generate random numbers.
package cryptoutils

import (
	"crypto/rand"
	"encoding/binary"
	"log"
	mathrand "math/rand"
)

type cryptoSource struct{}

// NewSource returns a new math/rand.Source that uses crypto/rand to generate random numbers.
// TODO: make it private as used only insisde this package.
func NewSource() mathrand.Source {
	return cryptoSource{}
}

func (s cryptoSource) Seed(seed int64) {
	// Seed is a no-op for cryptoSource as it doesn't use a seed.
}

func (s cryptoSource) Int63() int64 {
	var b [8]byte
	if _, err := rand.Read(b[:]); err != nil {
		log.Fatalf("crypto/rand failed: %v", err)
	}
	// Use binary.BigEndian to convert bytes to int64
	return int64(binary.BigEndian.Uint64(b[:]) & ^uint64(1<<63))
}
