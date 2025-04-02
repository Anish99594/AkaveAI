// Copyright (C) 2024 Akave
// See LICENSE for copying information.

package cryptoutils

import mathrand "math/rand"

// Shuffle shuffles the elements of a slice using cryptoSource.
func Shuffle[T any](data []T) {
	r := mathrand.New(NewSource())
	r.Shuffle(len(data), func(i, j int) {
		data[i], data[j] = data[j], data[i]
	})
}
