import fs from 'fs';
import path from 'path';

// ── Cycles ──────────────────────────────────────────
const cyclesPath = path.join(process.cwd(), 'data', 'cycles.json');

function ensureFile(filePath) {
  const dir = path.join(process.cwd(), 'data');
  if (!fs.existsSync(dir)) fs.mkdirSync(dir);
  if (!fs.existsSync(filePath)) fs.writeFileSync(filePath, '[]', 'utf-8');
}

export function getCycles() {
  ensureFile(cyclesPath);
  return JSON.parse(fs.readFileSync(cyclesPath, 'utf-8'));
}

export function getCycleById(id) {
  return getCycles().find((c) => c.id === id) || null;
}

export function addCycle(cycleData) {
  ensureFile(cyclesPath);
  const cycles = getCycles();
  const newCycle = {
    ...cycleData,
    id: Date.now().toString(),
    createdAt: new Date().toISOString(),
  };
  cycles.push(newCycle);
  fs.writeFileSync(cyclesPath, JSON.stringify(cycles, null, 2), 'utf-8');
  return newCycle;
}

export function updateCycle(id, updatedData) {
  ensureFile(cyclesPath);
  const cycles = getCycles();
  const index = cycles.findIndex((c) => c.id === id);
  if (index === -1) return null;
  cycles[index] = { ...cycles[index], ...updatedData, id };
  fs.writeFileSync(cyclesPath, JSON.stringify(cycles, null, 2), 'utf-8');
  return cycles[index];
}

export function deleteCycle(id) {
  ensureFile(cyclesPath);
  const cycles = getCycles();
  const index = cycles.findIndex((c) => c.id === id);
  if (index === -1) return false;
  cycles.splice(index, 1);
  fs.writeFileSync(cyclesPath, JSON.stringify(cycles, null, 2), 'utf-8');
  return true;
}

// ── Reviews ──────────────────────────────────────────
const reviewsPath = path.join(process.cwd(), 'data', 'reviews.json');

export function getReviews() {
  ensureFile(reviewsPath);
  return JSON.parse(fs.readFileSync(reviewsPath, 'utf-8'));
}

export function addReview(reviewData) {
  ensureFile(reviewsPath);
  const reviews = getReviews();
  const newReview = {
    ...reviewData,
    id: Date.now().toString(),
    approved: false,
    createdAt: new Date().toISOString(),
  };
  reviews.push(newReview);
  fs.writeFileSync(reviewsPath, JSON.stringify(reviews, null, 2), 'utf-8');
  return newReview;
}

export function deleteReview(id) {
  ensureFile(reviewsPath);
  const reviews = getReviews();
  const index = reviews.findIndex((r) => r.id === id);
  if (index === -1) return false;
  reviews.splice(index, 1);
  fs.writeFileSync(reviewsPath, JSON.stringify(reviews, null, 2), 'utf-8');
  return true;
}

export function toggleReviewApproval(id) {
  ensureFile(reviewsPath);
  const reviews = getReviews();
  const index = reviews.findIndex((r) => r.id === id);
  if (index === -1) return null;
  reviews[index].approved = !reviews[index].approved;
  fs.writeFileSync(reviewsPath, JSON.stringify(reviews, null, 2), 'utf-8');
  return reviews[index];
}
export function verifyAdmin(password) {
  const adminPassword = process.env.ADMIN_PASSWORD || 'admin123';
  return password === adminPassword;
}