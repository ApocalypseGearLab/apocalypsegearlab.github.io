# PR #30: checkout-independent preservation regression

## Root cause

The [initial GitHub Actions run](https://github.com/ApocalypseGearLab/apocalypsegearlab.github.io/actions/runs/41350563769) failed in `tests/phase6.test.ts` because the Phase 6 baseline captured raw bytes from an existing Windows working copy of `assets/media/image-manifest.csv`.

The repository rule is `* text=auto eol=lf`. `git ls-files --eol` reported `i/lf w/crlf`: the index/Git blob has LF endings, while the existing working file retains CRLF. Git normalizes text when adding/comparing it; it does not necessarily rewrite an already-present working file. Consequently a clean `git status` did not establish byte equality with a fresh Linux checkout. Locally, both the captured baseline and current working file used CRLF, so the raw hash assertion passed. GitHub Actions checked out LF bytes and correctly produced a different raw hash.

| Representation | Bytes | CRLF pairs | SHA-256 |
| --- | --- | --- | --- |
| Base/PR Git blob and Linux CI checkout | 3,245 | 0 | `784a154a629b42416b8e9657612ee453867f30cf4d99d84017432c94c2ddfaab` |
| Existing Windows working file/original captured expectation | 3,260 | 15 | `fd5af46bd04727e17ed8012a4223eb2aa65867a1c231b402b623676a39a93240` |

This was not a different-base or concurrent-media-edit problem. PR #30 and remote main both target `520d61a3b48d67ca01623eebcf4784275097dc56`. The manifest Git blob is identical in that base and original PR head `bcbd919ce11eb29e3367135627dbd7c3a811d20b`. All 168 protected files were compared against both commits; none had a changed Git blob. The manifest is the only captured expectation differing from its base Git bytes. See the [pre-correction diagnosis](qa/phase6/checkout-diagnosis.json).

## Correction and guarantees

Only this CSV baseline entry is corrected to the SHA-256 calculated from its immutable original base-commit Git blob. The original Windows capture hash is retained as provenance. The test explicitly permits CRLF-to-LF normalization for this exact path, matching the existing checkout rule. A one-to-one byte mapping removes only CR bytes immediately preceding LF; no trimming, whitespace folding, Unicode decoding, BOM removal or CSV parsing occurs.

Every other protected file remains hashed as raw bytes. The test rejects normalization flags on any other path and pins the baseline commit. An additional regression verifies both LF and CRLF forms, and proves that an actual manifest-byte edit, added UTF-8 BOM and changed binary media bytes still produce mismatches. The canonical CSV hash is pinned independently in that regression.

No media file, product record, `.gitattributes`, affiliate policy or tracking implementation is changed. The baseline was not regenerated from the current working tree or a newer main branch. This correction therefore does not absorb or overwrite legitimate media changes.

## Validation

An isolated snapshot was exported from Git with LF bytes. The original three-test Phase 6 file reproduced exactly one failure, including both SHA-256 values from Linux CI. Overlaying only the corrected baseline and test made all four Phase 6 tests pass. The current Windows checkout with its original CRLF CSV also passes all 100 unit tests. The temporary snapshots were removed after verification; the live manifest was not rewritten.

All 100 unit tests and all 127 browser tests passed, with zero Astro diagnostics and a successful 49-page production build. The complete local validation sequence is recorded separately in [ci-fix-validation.json](qa/phase6/ci-fix-validation.json): Astro checking, unit tests, image/release/affiliate/verification audits, product fixtures, production build, rendered-site checks, conversion/BougeRV/Phase 5.5 checks and all browser tests. GitHub Actions must pass on the correction commit before delivery is reported as green. No merge or deployment is authorized by this correction.
