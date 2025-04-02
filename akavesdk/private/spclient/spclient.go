// Copyright (C) 2024 Akave
// See LICENSE for copying information.

// Package spclient provides a client for communication with Filecoin SP.
package spclient

import (
	"context"
	"fmt"
	"io"
	"net/http"

	blocks "github.com/ipfs/go-block-format"
	"github.com/ipfs/go-cid"
)

// SPClient is a struct that represents SPClient.
type SPClient struct {
	client *http.Client
}

// New creates a new SPClient.
func New() *SPClient {
	return &SPClient{client: http.DefaultClient}
}

// Close closes the client.
func (f *SPClient) Close() {
	f.client.CloseIdleConnections()
}

// FetchBlock fetches the block from the filecoin provider.
func (f *SPClient) FetchBlock(ctx context.Context, spBaseURL string, cid cid.Cid) (blocks.Block, error) {
	req, err := http.NewRequestWithContext(ctx, http.MethodGet, fmt.Sprintf("%s/ipfs/%s?format=raw", spBaseURL, cid.String()), nil)
	if err != nil {
		return nil, fmt.Errorf("failed to create request: %w", err)
	}
	resp, err := f.client.Do(req)
	if err != nil {
		return nil, fmt.Errorf("failed to fetch block: %w", err)
	}
	defer func() {
		if cerr := resp.Body.Close(); cerr != nil {
			err = fmt.Errorf("failed to close response stream: %w", cerr)
		}
	}()

	if resp.StatusCode != http.StatusOK {
		return nil, fmt.Errorf("failed to fetch block, HTTP status: %s", resp.Status)
	}

	blockData, err := io.ReadAll(resp.Body)
	if err != nil {
		return nil, fmt.Errorf("failed to read block data: %w", err)
	}

	block, err := blocks.NewBlockWithCid(blockData, cid)
	if err != nil {
		return nil, fmt.Errorf("failed to create block: %w", err)
	}

	return block, nil
}
